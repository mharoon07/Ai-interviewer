"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _promises = require("fs/promises");

var _path = _interopRequireDefault(require("path"));

var _server = require("next/server");

var _db = _interopRequireDefault(require("../../../lib/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(req) {
  var body, image, base64Data, buffer, uploadDir, fileName, filePath;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _db["default"])());

        case 3:
          console.log("request Received");
          _context.next = 6;
          return regeneratorRuntime.awrap(req.json());

        case 6:
          body = _context.sent;
          image = body.image;

          if (!image) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "No image provided"
          }, {
            status: 400
          }));

        case 10:
          base64Data = image.replace(/^data:image\/\w+;base64,/, "");
          buffer = Buffer.from(base64Data, 'base64');
          uploadDir = _path["default"].join(process.cwd(), 'public', 'uploads');
          _context.next = 15;
          return regeneratorRuntime.awrap((0, _promises.mkdir)(uploadDir, {
            recursive: true
          }));

        case 15:
          fileName = "".concat(Date.now(), ".jpg");
          filePath = _path["default"].join(uploadDir, fileName);
          _context.next = 19;
          return regeneratorRuntime.awrap((0, _promises.writeFile)(filePath, buffer));

        case 19:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            filename: fileName,
            url: "/uploads/".concat(fileName)
          }));

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.error("Upload error:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Server error"
          }, {
            status: 500
          }));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
}