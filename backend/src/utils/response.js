export const ok = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
    error: null,
  });
};

export const fail = (res, error, status = 400) => {
  return res.status(status).json({
    success: false,
    data: null,
    error,
  });
};
