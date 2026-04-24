import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { ok, fail } from "../utils/response.js";
import Task from "../models/Task.js";
import { findUserById } from "../store/users.js";

const tasksRouter = Router();

const urgencyWeight = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

function calculateImpactPoints(task) {
  const weight = urgencyWeight[task.urgency] || 1;
  return Math.round(100 * weight * (task.locationMatch || 1) * (task.skillMatch || 1));
}

tasksRouter.post("/", requireAuth, async (req, res) => {
  try {
    const { title, organizationName, urgency, locationZone, skillsRequired, hours, peopleRequired, payout } = req.body;
    
    if (!title || !organizationName || !urgency || !locationZone || !hours || !peopleRequired) {
      return fail(res, "Missing required fields", 400);
    }

    const newTask = new Task({
      title,
      organizationName,
      urgency,
      locationZone,
      skillsRequired: skillsRequired || [],
      hours: Number(hours),
      peopleRequired: Number(peopleRequired),
      payout: payout || "None",
      distanceKm: Math.max(1, Math.round(Math.random() * 10)), // mock relative distance
    });

    const savedTask = await newTask.save();
    return ok(res, { task: savedTask }, 201);
  } catch (err) {
    console.error("Task creation error:", err);
    return fail(res, "Failed to create task", 500);
  }
});

tasksRouter.get("/ngo", requireAuth, async (req, res) => {
  try {
    const user = await findUserById(req.auth?.sub);
    const orgName = user?.name; // or user?.organizationName based on how NGO is set
    
    if (!orgName) return fail(res, "Organization context missing", 400);

    const tasks = await Task.find({ organizationName: orgName }).lean();
    
    const processedTasks = tasks.map(t => {
      const { _id, ...rest } = t;
      return { id: _id, ...rest, impactPoints: calculateImpactPoints(t) };
    });

    return ok(res, { tasks: processedTasks });
  } catch (err) {
    console.error("NGO Tasks fetch error:", err);
    return fail(res, "Failed to fetch NGO tasks", 500);
  }
});

tasksRouter.post("/:id/apply", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.sub;
    if (!userId) return fail(res, "User ID missing", 400);

    const task = await Task.findById(id);
    if (!task) return fail(res, "Task not found", 404);

    if (task.appliedVolunteers.includes(userId)) {
      return fail(res, "Already applied", 400);
    }
    
    if (task.appliedVolunteers.length >= task.peopleRequired) {
      return fail(res, "Task is already full", 400);
    }

    task.appliedVolunteers.push(userId);
    
    // Automatically flag as ongoing if it's full
    if (task.appliedVolunteers.length >= task.peopleRequired) {
      task.status = "ongoing";
    }

    await task.save();
    
    const updated = task.toObject();
    const { _id, ...rest } = updated;
    return ok(res, { task: { id: _id, ...rest, impactPoints: calculateImpactPoints(updated) } });
  } catch (err) {
    console.error("Task apply error:", err);
    return fail(res, "Failed to apply to task", 500);
  }
});

tasksRouter.get("/", async (req, res) => {
  try {
    const { skill = "", urgency = "", maxDistanceKm = "", organization = "", zone = "" } = req.query;

    const query = { status: "waiting for volunteers" };
    if (skill) {
      query.skillsRequired = { $regex: new RegExp(skill, "i") };
    }
    if (urgency) {
      query.urgency = urgency.toLowerCase();
    }
    if (maxDistanceKm) {
      query.distanceKm = { $lte: Number(maxDistanceKm) || 1000 };
    }
    if (organization) {
      query.organizationName = { $regex: new RegExp(organization, "i") };
    }
    if (zone) {
      query.locationZone = { $regex: new RegExp(`^${zone}$`, "i") };
    }

    const tasks = await Task.find(query).lean();
    
    // Calculate impact points and rename _id to id
    const processedTasks = tasks.map(t => {
      const { _id, ...rest } = t;
      return {
        id: _id,
        ...rest,
        impactPoints: calculateImpactPoints(t)
      };
    });

    return ok(res, { tasks: processedTasks });
  } catch (err) {
    console.error("Task fetch error:", err);
    return fail(res, "Failed to fetch tasks", 500);
  }
});

tasksRouter.get("/heatmap", async (req, res) => {
  try {
    const tasks = await Task.find({ status: "waiting for volunteers" }).lean();
    
    const grouped = new Map();

    tasks.forEach((task) => {
      const existing = grouped.get(task.locationZone) || {
        id: task.locationZone.toLowerCase().replaceAll(" ", "-"),
        label: task.locationZone,
        activeTasks: 0,
        volunteerCount: 0,
        urgencyScore: 0,
      };

      existing.activeTasks += 1;
      existing.volunteerCount += Math.max(1, Math.round(6 - task.distanceKm / 2));
      existing.urgencyScore += (urgencyWeight[task.urgency] || 1);

      grouped.set(task.locationZone, existing);
    });

    const areas = Array.from(grouped.values()).map((area) => ({
      ...area,
      intensity: Math.min(100, area.urgencyScore * 18),
    }));

    return ok(res, { areas, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Heatmap fetch error:", err);
    return fail(res, "Failed to fetch heatmap data", 500);
  }
});

export default tasksRouter;
