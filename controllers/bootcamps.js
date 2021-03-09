//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Show all Bootcamps",
  });
};

//@desc     Get single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show Bootcamp ${req.params.id}`,
  });
};

//@desc     Create new bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Create new Bootcamps",
  });
};

//@desc     Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update Bootcamp ${req.params.id}`,
  });
};

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete Bootcamp ${req.params.id}`,
  });
};
