var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/wa-sqlite.js
var require_wa_sqlite = __commonJS({
  "../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/wa-sqlite.js"(exports, module) {
    var Module = (() => {
      var _scriptName = typeof document != "undefined" ? document.currentScript?.src : void 0;
      return (async function(moduleArg = {}) {
        var moduleRtn;
        var Module2 = moduleArg;
        var ENVIRONMENT_IS_WEB = typeof window == "object";
        var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
        var ENVIRONMENT_IS_NODE = typeof process == "object" && process.versions?.node && process.type != "renderer";
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => {
          throw toThrow;
        };
        if (ENVIRONMENT_IS_WORKER) {
          _scriptName = self.location.href;
        }
        var scriptDirectory = "";
        function locateFile(path) {
          if (Module2["locateFile"]) {
            return Module2["locateFile"](path, scriptDirectory);
          }
          return scriptDirectory + path;
        }
        var readAsync, readBinary;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
          try {
            scriptDirectory = new URL(".", _scriptName).href;
          } catch {
          }
          {
            if (ENVIRONMENT_IS_WORKER) {
              readBinary = (url) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response);
              };
            }
            readAsync = async (url) => {
              var response = await fetch(url, { credentials: "same-origin" });
              if (response.ok) {
                return response.arrayBuffer();
              }
              throw new Error(response.status + " : " + response.url);
            };
          }
        } else {
        }
        var out = console.log.bind(console);
        var err = console.error.bind(console);
        var wasmBinary;
        var ABORT = false;
        var EXITSTATUS;
        var readyPromiseResolve, readyPromiseReject;
        var wasmMemory;
        var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        var runtimeInitialized = false;
        function updateMemoryViews() {
          var b = wasmMemory.buffer;
          HEAP8 = new Int8Array(b);
          HEAP16 = new Int16Array(b);
          Module2["HEAPU8"] = HEAPU8 = new Uint8Array(b);
          HEAPU16 = new Uint16Array(b);
          Module2["HEAP32"] = HEAP32 = new Int32Array(b);
          HEAPU32 = new Uint32Array(b);
          HEAPF32 = new Float32Array(b);
          HEAPF64 = new Float64Array(b);
        }
        function preRun() {
          if (Module2["preRun"]) {
            if (typeof Module2["preRun"] == "function") Module2["preRun"] = [Module2["preRun"]];
            while (Module2["preRun"].length) {
              addOnPreRun(Module2["preRun"].shift());
            }
          }
          callRuntimeCallbacks(onPreRuns);
        }
        function initRuntime() {
          runtimeInitialized = true;
          if (!Module2["noFSInit"] && !FS.initialized) FS.init();
          TTY.init();
          wasmExports["qa"]();
          FS.ignorePermissions = false;
        }
        function preMain() {
        }
        function postRun() {
          if (Module2["postRun"]) {
            if (typeof Module2["postRun"] == "function") Module2["postRun"] = [Module2["postRun"]];
            while (Module2["postRun"].length) {
              addOnPostRun(Module2["postRun"].shift());
            }
          }
          callRuntimeCallbacks(onPostRuns);
        }
        var runDependencies = 0;
        var dependenciesFulfilled = null;
        function addRunDependency(id) {
          runDependencies++;
          Module2["monitorRunDependencies"]?.(runDependencies);
        }
        function removeRunDependency(id) {
          runDependencies--;
          Module2["monitorRunDependencies"]?.(runDependencies);
          if (runDependencies == 0) {
            if (dependenciesFulfilled) {
              var callback = dependenciesFulfilled;
              dependenciesFulfilled = null;
              callback();
            }
          }
        }
        function abort(what) {
          Module2["onAbort"]?.(what);
          what = "Aborted(" + what + ")";
          err(what);
          ABORT = true;
          what += ". Build with -sASSERTIONS for more info.";
          var e = new WebAssembly.RuntimeError(what);
          readyPromiseReject?.(e);
          throw e;
        }
        var wasmBinaryFile;
        function findWasmBinary() {
          return locateFile("wa-sqlite.wasm");
        }
        function getBinarySync(file) {
          if (file == wasmBinaryFile && wasmBinary) {
            return new Uint8Array(wasmBinary);
          }
          if (readBinary) {
            return readBinary(file);
          }
          throw "both async and sync fetching of the wasm failed";
        }
        async function getWasmBinary(binaryFile) {
          if (!wasmBinary) {
            try {
              var response = await readAsync(binaryFile);
              return new Uint8Array(response);
            } catch {
            }
          }
          return getBinarySync(binaryFile);
        }
        async function instantiateArrayBuffer(binaryFile, imports) {
          try {
            var binary = await getWasmBinary(binaryFile);
            var instance = await WebAssembly.instantiate(binary, imports);
            return instance;
          } catch (reason) {
            err(`failed to asynchronously prepare wasm: ${reason}`);
            abort(reason);
          }
        }
        async function instantiateAsync(binary, binaryFile, imports) {
          if (!binary && typeof WebAssembly.instantiateStreaming == "function") {
            try {
              var response = fetch(binaryFile, { credentials: "same-origin" });
              var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
              return instantiationResult;
            } catch (reason) {
              err(`wasm streaming compile failed: ${reason}`);
              err("falling back to ArrayBuffer instantiation");
            }
          }
          return instantiateArrayBuffer(binaryFile, imports);
        }
        function getWasmImports() {
          return { a: wasmImports };
        }
        async function createWasm() {
          function receiveInstance(instance, module2) {
            wasmExports = instance.exports;
            wasmMemory = wasmExports["pa"];
            updateMemoryViews();
            wasmTable = wasmExports["qf"];
            assignWasmExports(wasmExports);
            removeRunDependency("wasm-instantiate");
            return wasmExports;
          }
          addRunDependency("wasm-instantiate");
          function receiveInstantiationResult(result2) {
            return receiveInstance(result2["instance"]);
          }
          var info = getWasmImports();
          if (Module2["instantiateWasm"]) {
            return new Promise((resolve, reject) => {
              Module2["instantiateWasm"](info, (mod, inst) => {
                resolve(receiveInstance(mod, inst));
              });
            });
          }
          wasmBinaryFile ??= findWasmBinary();
          var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
          var exports2 = receiveInstantiationResult(result);
          return exports2;
        }
        var tempDouble;
        var tempI64;
        class ExitStatus {
          name = "ExitStatus";
          constructor(status) {
            this.message = `Program terminated with exit(${status})`;
            this.status = status;
          }
        }
        var callRuntimeCallbacks = (callbacks) => {
          while (callbacks.length > 0) {
            callbacks.shift()(Module2);
          }
        };
        var onPostRuns = [];
        var addOnPostRun = (cb) => onPostRuns.push(cb);
        var onPreRuns = [];
        var addOnPreRun = (cb) => onPreRuns.push(cb);
        function getValue(ptr, type = "i8") {
          if (type.endsWith("*")) type = "*";
          switch (type) {
            case "i1":
              return HEAP8[ptr];
            case "i8":
              return HEAP8[ptr];
            case "i16":
              return HEAP16[ptr >> 1];
            case "i32":
              return HEAP32[ptr >> 2];
            case "i64":
              abort("to do getValue(i64) use WASM_BIGINT");
            case "float":
              return HEAPF32[ptr >> 2];
            case "double":
              return HEAPF64[ptr >> 3];
            case "*":
              return HEAPU32[ptr >> 2];
            default:
              abort(`invalid type for getValue: ${type}`);
          }
        }
        var noExitRuntime = true;
        function setValue(ptr, value, type = "i8") {
          if (type.endsWith("*")) type = "*";
          switch (type) {
            case "i1":
              HEAP8[ptr] = value;
              break;
            case "i8":
              HEAP8[ptr] = value;
              break;
            case "i16":
              HEAP16[ptr >> 1] = value;
              break;
            case "i32":
              HEAP32[ptr >> 2] = value;
              break;
            case "i64":
              abort("to do setValue(i64) use WASM_BIGINT");
            case "float":
              HEAPF32[ptr >> 2] = value;
              break;
            case "double":
              HEAPF64[ptr >> 3] = value;
              break;
            case "*":
              HEAPU32[ptr >> 2] = value;
              break;
            default:
              abort(`invalid type for setValue: ${type}`);
          }
        }
        var stackRestore = (val) => __emscripten_stack_restore(val);
        var stackSave = () => _emscripten_stack_get_current();
        var UTF8Decoder = new TextDecoder();
        var UTF8ToString = (ptr, maxBytesToRead) => {
          if (!ptr) return "";
          var maxPtr = ptr + maxBytesToRead;
          for (var end = ptr; !(end >= maxPtr) && HEAPU8[end]; ) ++end;
          return UTF8Decoder.decode(HEAPU8.subarray(ptr, end));
        };
        var ___assert_fail = (condition, filename, line, func) => abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
        var PATH = { isAbs: (path) => path.charAt(0) === "/", splitPath: (filename) => {
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return splitPathRe.exec(filename).slice(1);
        }, normalizeArray: (parts, allowAboveRoot) => {
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
              parts.splice(i, 1);
            } else if (last === "..") {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up; up--) {
              parts.unshift("..");
            }
          }
          return parts;
        }, normalize: (path) => {
          var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
          path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        }, dirname: (path) => {
          var result = PATH.splitPath(path), root = result[0], dir = result[1];
          if (!root && !dir) {
            return ".";
          }
          if (dir) {
            dir = dir.slice(0, -1);
          }
          return root + dir;
        }, basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1], join: (...paths) => PATH.normalize(paths.join("/")), join2: (l, r) => PATH.normalize(l + "/" + r) };
        var initRandomFill = () => (view) => crypto.getRandomValues(view);
        var randomFill = (view) => {
          (randomFill = initRandomFill())(view);
        };
        var PATH_FS = { resolve: (...args) => {
          var resolvedPath = "", resolvedAbsolute = false;
          for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? args[i] : FS.cwd();
            if (typeof path != "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              return "";
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = PATH.isAbs(path);
          }
          resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        }, relative: (from, to) => {
          from = PATH_FS.resolve(from).slice(1);
          to = PATH_FS.resolve(to).slice(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== "") break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "") break;
            }
            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        } };
        var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
          var endIdx = idx + maxBytesToRead;
          var endPtr = idx;
          while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
          return UTF8Decoder.decode(heapOrArray.buffer ? heapOrArray.subarray(idx, endPtr) : new Uint8Array(heapOrArray.slice(idx, endPtr)));
        };
        var FS_stdin_getChar_buffer = [];
        var lengthBytesUTF8 = (str) => {
          var len = 0;
          for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            if (c <= 127) {
              len++;
            } else if (c <= 2047) {
              len += 2;
            } else if (c >= 55296 && c <= 57343) {
              len += 4;
              ++i;
            } else {
              len += 3;
            }
          }
          return len;
        };
        var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
          if (!(maxBytesToWrite > 0)) return 0;
          var startIdx = outIdx;
          var endIdx = outIdx + maxBytesToWrite - 1;
          for (var i = 0; i < str.length; ++i) {
            var u = str.codePointAt(i);
            if (u <= 127) {
              if (outIdx >= endIdx) break;
              heap[outIdx++] = u;
            } else if (u <= 2047) {
              if (outIdx + 1 >= endIdx) break;
              heap[outIdx++] = 192 | u >> 6;
              heap[outIdx++] = 128 | u & 63;
            } else if (u <= 65535) {
              if (outIdx + 2 >= endIdx) break;
              heap[outIdx++] = 224 | u >> 12;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
            } else {
              if (outIdx + 3 >= endIdx) break;
              heap[outIdx++] = 240 | u >> 18;
              heap[outIdx++] = 128 | u >> 12 & 63;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
              i++;
            }
          }
          heap[outIdx] = 0;
          return outIdx - startIdx;
        };
        var intArrayFromString = (stringy, dontAddNull, length) => {
          var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
          var u8array = new Array(len);
          var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
          if (dontAddNull) u8array.length = numBytesWritten;
          return u8array;
        };
        var FS_stdin_getChar = () => {
          if (!FS_stdin_getChar_buffer.length) {
            var result = null;
            if (typeof window != "undefined" && typeof window.prompt == "function") {
              result = window.prompt("Input: ");
              if (result !== null) {
                result += "\n";
              }
            } else {
            }
            if (!result) {
              return null;
            }
            FS_stdin_getChar_buffer = intArrayFromString(result, true);
          }
          return FS_stdin_getChar_buffer.shift();
        };
        var TTY = { ttys: [], init() {
        }, shutdown() {
        }, register(dev, ops) {
          TTY.ttys[dev] = { input: [], output: [], ops };
          FS.registerDevice(dev, TTY.stream_ops);
        }, stream_ops: { open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        }, close(stream) {
          stream.tty.ops.fsync(stream.tty);
        }, fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        }, read(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === void 0 && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === void 0) break;
            bytesRead++;
            buffer[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.atime = Date.now();
          }
          return bytesRead;
        }, write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.mtime = stream.node.ctime = Date.now();
          }
          return i;
        } }, default_tty_ops: { get_char(tty) {
          return FS_stdin_getChar();
        }, put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        }, fsync(tty) {
          if (tty.output?.length > 0) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        }, ioctl_tcgets(tty) {
          return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
        }, ioctl_tcsets(tty, optional_actions, data) {
          return 0;
        }, ioctl_tiocgwinsz(tty) {
          return [24, 80];
        } }, default_tty1_ops: { put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        }, fsync(tty) {
          if (tty.output?.length > 0) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        } } };
        var zeroMemory = (ptr, size) => HEAPU8.fill(0, ptr, ptr + size);
        var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
        var mmapAlloc = (size) => {
          size = alignMemory(size, 65536);
          var ptr = _emscripten_builtin_memalign(65536, size);
          if (ptr) zeroMemory(ptr, size);
          return ptr;
        };
        var MEMFS = { ops_table: null, mount(mount) {
          return MEMFS.createNode(null, "/", 16895, 0);
        }, createNode(parent, name, mode, dev) {
          if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(63);
          }
          MEMFS.ops_table ||= { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
          var node = FS.createNode(parent, name, mode, dev);
          if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
          } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = null;
          } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
          } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
          }
          node.atime = node.mtime = node.ctime = Date.now();
          if (parent) {
            parent.contents[name] = node;
            parent.atime = parent.mtime = parent.ctime = node.atime;
          }
          return node;
        }, getFileDataAsTypedArray(node) {
          if (!node.contents) return new Uint8Array(0);
          if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
          return new Uint8Array(node.contents);
        }, expandFileStorage(node, newCapacity) {
          var prevCapacity = node.contents ? node.contents.length : 0;
          if (prevCapacity >= newCapacity) return;
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
          if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity);
          if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
        }, resizeFileStorage(node, newSize) {
          if (node.usedBytes == newSize) return;
          if (newSize == 0) {
            node.contents = null;
            node.usedBytes = 0;
          } else {
            var oldContents = node.contents;
            node.contents = new Uint8Array(newSize);
            if (oldContents) {
              node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
            }
            node.usedBytes = newSize;
          }
        }, node_ops: { getattr(node) {
          var attr = {};
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.atime);
          attr.mtime = new Date(node.mtime);
          attr.ctime = new Date(node.ctime);
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        }, setattr(node, attr) {
          for (const key of ["mode", "atime", "mtime", "ctime"]) {
            if (attr[key] != null) {
              node[key] = attr[key];
            }
          }
          if (attr.size !== void 0) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        }, lookup(parent, name) {
          throw MEMFS.doesNotExistError;
        }, mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        }, rename(old_node, new_dir, new_name) {
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (new_node) {
            if (FS.isDir(old_node.mode)) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
            FS.hashRemoveNode(new_node);
          }
          delete old_node.parent.contents[old_node.name];
          new_dir.contents[new_name] = old_node;
          old_node.name = new_name;
          new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
        }, unlink(parent, name) {
          delete parent.contents[name];
          parent.ctime = parent.mtime = Date.now();
        }, rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.ctime = parent.mtime = Date.now();
        }, readdir(node) {
          return [".", "..", ...Object.keys(node.contents)];
        }, symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        }, readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        } }, stream_ops: { read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        }, write(stream, buffer, offset, length, position, canOwn) {
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
          if (!length) return 0;
          var node = stream.node;
          node.mtime = node.ctime = Date.now();
          if (buffer.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) {
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer.subarray) {
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer[offset + i];
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        }, llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        }, mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        }, msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          return 0;
        } } };
        var asyncLoad = async (url) => {
          var arrayBuffer = await readAsync(url);
          return new Uint8Array(arrayBuffer);
        };
        var FS_createDataFile = (...args) => FS.createDataFile(...args);
        var getUniqueRunDependency = (id) => id;
        var preloadPlugins = [];
        var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
          if (typeof Browser != "undefined") Browser.init();
          var handled = false;
          preloadPlugins.forEach((plugin) => {
            if (handled) return;
            if (plugin["canHandle"](fullname)) {
              plugin["handle"](byteArray, fullname, finish, onerror);
              handled = true;
            }
          });
          return handled;
        };
        var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
          var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
          var dep = getUniqueRunDependency(`cp ${fullname}`);
          function processData(byteArray) {
            function finish(byteArray2) {
              preFinish?.();
              if (!dontCreateFile) {
                FS_createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
              }
              onload?.();
              removeRunDependency(dep);
            }
            if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
              onerror?.();
              removeRunDependency(dep);
            })) {
              return;
            }
            finish(byteArray);
          }
          addRunDependency(dep);
          if (typeof url == "string") {
            asyncLoad(url).then(processData, onerror);
          } else {
            processData(url);
          }
        };
        var FS_modeStringToFlags = (str) => {
          var flagModes = { r: 0, "r+": 2, w: 512 | 64 | 1, "w+": 512 | 64 | 2, a: 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
          var flags = flagModes[str];
          if (typeof flags == "undefined") {
            throw new Error(`Unknown file open mode: ${str}`);
          }
          return flags;
        };
        var FS_getMode = (canRead, canWrite) => {
          var mode = 0;
          if (canRead) mode |= 292 | 73;
          if (canWrite) mode |= 146;
          return mode;
        };
        var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, filesystems: null, syncFSRequests: 0, readFiles: {}, ErrnoError: class {
          name = "ErrnoError";
          constructor(errno) {
            this.errno = errno;
          }
        }, FSStream: class {
          shared = {};
          get object() {
            return this.node;
          }
          set object(val) {
            this.node = val;
          }
          get isRead() {
            return (this.flags & 2097155) !== 1;
          }
          get isWrite() {
            return (this.flags & 2097155) !== 0;
          }
          get isAppend() {
            return this.flags & 1024;
          }
          get flags() {
            return this.shared.flags;
          }
          set flags(val) {
            this.shared.flags = val;
          }
          get position() {
            return this.shared.position;
          }
          set position(val) {
            this.shared.position = val;
          }
        }, FSNode: class {
          node_ops = {};
          stream_ops = {};
          readMode = 292 | 73;
          writeMode = 146;
          mounted = null;
          constructor(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.rdev = rdev;
            this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return (this.mode & this.readMode) === this.readMode;
          }
          set read(val) {
            val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
          }
          get write() {
            return (this.mode & this.writeMode) === this.writeMode;
          }
          set write(val) {
            val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
          }
          get isFolder() {
            return FS.isDir(this.mode);
          }
          get isDevice() {
            return FS.isChrdev(this.mode);
          }
        }, lookupPath(path, opts = {}) {
          if (!path) {
            throw new FS.ErrnoError(44);
          }
          opts.follow_mount ??= true;
          if (!PATH.isAbs(path)) {
            path = FS.cwd() + "/" + path;
          }
          linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
            var parts = path.split("/").filter((p) => !!p);
            var current = FS.root;
            var current_path = "/";
            for (var i = 0; i < parts.length; i++) {
              var islast = i === parts.length - 1;
              if (islast && opts.parent) {
                break;
              }
              if (parts[i] === ".") {
                continue;
              }
              if (parts[i] === "..") {
                current_path = PATH.dirname(current_path);
                if (FS.isRoot(current)) {
                  path = current_path + "/" + parts.slice(i + 1).join("/");
                  continue linkloop;
                } else {
                  current = current.parent;
                }
                continue;
              }
              current_path = PATH.join2(current_path, parts[i]);
              try {
                current = FS.lookupNode(current, parts[i]);
              } catch (e) {
                if (e?.errno === 44 && islast && opts.noent_okay) {
                  return { path: current_path };
                }
                throw e;
              }
              if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
                current = current.mounted.root;
              }
              if (FS.isLink(current.mode) && (!islast || opts.follow)) {
                if (!current.node_ops.readlink) {
                  throw new FS.ErrnoError(52);
                }
                var link = current.node_ops.readlink(current);
                if (!PATH.isAbs(link)) {
                  link = PATH.dirname(current_path) + "/" + link;
                }
                path = link + "/" + parts.slice(i + 1).join("/");
                continue linkloop;
              }
            }
            return { path: current_path, node: current };
          }
          throw new FS.ErrnoError(32);
        }, getPath(node) {
          var path;
          while (true) {
            if (FS.isRoot(node)) {
              var mount = node.mount.mountpoint;
              if (!path) return mount;
              return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
            }
            path = path ? `${node.name}/${path}` : node.name;
            node = node.parent;
          }
        }, hashName(parentid, name) {
          var hash = 0;
          for (var i = 0; i < name.length; i++) {
            hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
          }
          return (parentid + hash >>> 0) % FS.nameTable.length;
        }, hashAddNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          node.name_next = FS.nameTable[hash];
          FS.nameTable[hash] = node;
        }, hashRemoveNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next;
          } else {
            var current = FS.nameTable[hash];
            while (current) {
              if (current.name_next === node) {
                current.name_next = node.name_next;
                break;
              }
              current = current.name_next;
            }
          }
        }, lookupNode(parent, name) {
          var errCode = FS.mayLookup(parent);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          var hash = FS.hashName(parent.id, name);
          for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
              return node;
            }
          }
          return FS.lookup(parent, name);
        }, createNode(parent, name, mode, rdev) {
          var node = new FS.FSNode(parent, name, mode, rdev);
          FS.hashAddNode(node);
          return node;
        }, destroyNode(node) {
          FS.hashRemoveNode(node);
        }, isRoot(node) {
          return node === node.parent;
        }, isMountpoint(node) {
          return !!node.mounted;
        }, isFile(mode) {
          return (mode & 61440) === 32768;
        }, isDir(mode) {
          return (mode & 61440) === 16384;
        }, isLink(mode) {
          return (mode & 61440) === 40960;
        }, isChrdev(mode) {
          return (mode & 61440) === 8192;
        }, isBlkdev(mode) {
          return (mode & 61440) === 24576;
        }, isFIFO(mode) {
          return (mode & 61440) === 4096;
        }, isSocket(mode) {
          return (mode & 49152) === 49152;
        }, flagsToPermissionString(flag) {
          var perms = ["r", "w", "rw"][flag & 3];
          if (flag & 512) {
            perms += "w";
          }
          return perms;
        }, nodePermissions(node, perms) {
          if (FS.ignorePermissions) {
            return 0;
          }
          if (perms.includes("r") && !(node.mode & 292)) {
            return 2;
          } else if (perms.includes("w") && !(node.mode & 146)) {
            return 2;
          } else if (perms.includes("x") && !(node.mode & 73)) {
            return 2;
          }
          return 0;
        }, mayLookup(dir) {
          if (!FS.isDir(dir.mode)) return 54;
          var errCode = FS.nodePermissions(dir, "x");
          if (errCode) return errCode;
          if (!dir.node_ops.lookup) return 2;
          return 0;
        }, mayCreate(dir, name) {
          if (!FS.isDir(dir.mode)) {
            return 54;
          }
          try {
            var node = FS.lookupNode(dir, name);
            return 20;
          } catch (e) {
          }
          return FS.nodePermissions(dir, "wx");
        }, mayDelete(dir, name, isdir) {
          var node;
          try {
            node = FS.lookupNode(dir, name);
          } catch (e) {
            return e.errno;
          }
          var errCode = FS.nodePermissions(dir, "wx");
          if (errCode) {
            return errCode;
          }
          if (isdir) {
            if (!FS.isDir(node.mode)) {
              return 54;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
              return 10;
            }
          } else {
            if (FS.isDir(node.mode)) {
              return 31;
            }
          }
          return 0;
        }, mayOpen(node, flags) {
          if (!node) {
            return 44;
          }
          if (FS.isLink(node.mode)) {
            return 32;
          } else if (FS.isDir(node.mode)) {
            if (FS.flagsToPermissionString(flags) !== "r" || flags & (512 | 64)) {
              return 31;
            }
          }
          return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
        }, checkOpExists(op, err2) {
          if (!op) {
            throw new FS.ErrnoError(err2);
          }
          return op;
        }, MAX_OPEN_FDS: 4096, nextfd() {
          for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
            if (!FS.streams[fd]) {
              return fd;
            }
          }
          throw new FS.ErrnoError(33);
        }, getStreamChecked(fd) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          return stream;
        }, getStream: (fd) => FS.streams[fd], createStream(stream, fd = -1) {
          stream = Object.assign(new FS.FSStream(), stream);
          if (fd == -1) {
            fd = FS.nextfd();
          }
          stream.fd = fd;
          FS.streams[fd] = stream;
          return stream;
        }, closeStream(fd) {
          FS.streams[fd] = null;
        }, dupStream(origStream, fd = -1) {
          var stream = FS.createStream(origStream, fd);
          stream.stream_ops?.dup?.(stream);
          return stream;
        }, doSetAttr(stream, node, attr) {
          var setattr = stream?.stream_ops.setattr;
          var arg = setattr ? stream : node;
          setattr ??= node.node_ops.setattr;
          FS.checkOpExists(setattr, 63);
          setattr(arg, attr);
        }, chrdev_stream_ops: { open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          stream.stream_ops.open?.(stream);
        }, llseek() {
          throw new FS.ErrnoError(70);
        } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice(dev, ops) {
          FS.devices[dev] = { stream_ops: ops };
        }, getDevice: (dev) => FS.devices[dev], getMounts(mount) {
          var mounts = [];
          var check = [mount];
          while (check.length) {
            var m = check.pop();
            mounts.push(m);
            check.push(...m.mounts);
          }
          return mounts;
        }, syncfs(populate, callback) {
          if (typeof populate == "function") {
            callback = populate;
            populate = false;
          }
          FS.syncFSRequests++;
          if (FS.syncFSRequests > 1) {
            err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          }
          var mounts = FS.getMounts(FS.root.mount);
          var completed = 0;
          function doCallback(errCode) {
            FS.syncFSRequests--;
            return callback(errCode);
          }
          function done(errCode) {
            if (errCode) {
              if (!done.errored) {
                done.errored = true;
                return doCallback(errCode);
              }
              return;
            }
            if (++completed >= mounts.length) {
              doCallback(null);
            }
          }
          mounts.forEach((mount) => {
            if (!mount.type.syncfs) {
              return done(null);
            }
            mount.type.syncfs(mount, populate, done);
          });
        }, mount(type, opts, mountpoint) {
          var root = mountpoint === "/";
          var pseudo = !mountpoint;
          var node;
          if (root && FS.root) {
            throw new FS.ErrnoError(10);
          } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
            mountpoint = lookup.path;
            node = lookup.node;
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            if (!FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
          }
          var mount = { type, opts, mountpoint, mounts: [] };
          var mountRoot = type.mount(mount);
          mountRoot.mount = mount;
          mount.root = mountRoot;
          if (root) {
            FS.root = mountRoot;
          } else if (node) {
            node.mounted = mount;
            if (node.mount) {
              node.mount.mounts.push(mount);
            }
          }
          return mountRoot;
        }, unmount(mountpoint) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
          if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(28);
          }
          var node = lookup.node;
          var mount = node.mounted;
          var mounts = FS.getMounts(mount);
          Object.keys(FS.nameTable).forEach((hash) => {
            var current = FS.nameTable[hash];
            while (current) {
              var next = current.name_next;
              if (mounts.includes(current.mount)) {
                FS.destroyNode(current);
              }
              current = next;
            }
          });
          node.mounted = null;
          var idx = node.mount.mounts.indexOf(mount);
          node.mount.mounts.splice(idx, 1);
        }, lookup(parent, name) {
          return parent.node_ops.lookup(parent, name);
        }, mknod(path, mode, dev) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          if (!name) {
            throw new FS.ErrnoError(28);
          }
          if (name === "." || name === "..") {
            throw new FS.ErrnoError(20);
          }
          var errCode = FS.mayCreate(parent, name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.mknod(parent, name, mode, dev);
        }, statfs(path) {
          return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
        }, statfsStream(stream) {
          return FS.statfsNode(stream.node);
        }, statfsNode(node) {
          var rtn = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: FS.nextInode, ffree: FS.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
          if (node.node_ops.statfs) {
            Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
          }
          return rtn;
        }, create(path, mode = 438) {
          mode &= 4095;
          mode |= 32768;
          return FS.mknod(path, mode, 0);
        }, mkdir(path, mode = 511) {
          mode &= 511 | 512;
          mode |= 16384;
          return FS.mknod(path, mode, 0);
        }, mkdirTree(path, mode) {
          var dirs = path.split("/");
          var d = "";
          for (var dir of dirs) {
            if (!dir) continue;
            if (d || PATH.isAbs(path)) d += "/";
            d += dir;
            try {
              FS.mkdir(d, mode);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
          }
        }, mkdev(path, mode, dev) {
          if (typeof dev == "undefined") {
            dev = mode;
            mode = 438;
          }
          mode |= 8192;
          return FS.mknod(path, mode, dev);
        }, symlink(oldpath, newpath) {
          if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44);
          }
          var lookup = FS.lookupPath(newpath, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.symlink(parent, newname, oldpath);
        }, rename(old_path, new_path) {
          var old_dirname = PATH.dirname(old_path);
          var new_dirname = PATH.dirname(new_path);
          var old_name = PATH.basename(old_path);
          var new_name = PATH.basename(new_path);
          var lookup, old_dir, new_dir;
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
          if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
          if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75);
          }
          var old_node = FS.lookupNode(old_dir, old_name);
          var relative = PATH_FS.relative(old_path, new_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(28);
          }
          relative = PATH_FS.relative(new_path, old_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(55);
          }
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (old_node === new_node) {
            return;
          }
          var isdir = FS.isDir(old_node.mode);
          var errCode = FS.mayDelete(old_dir, old_name, isdir);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
            throw new FS.ErrnoError(10);
          }
          if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, "w");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          FS.hashRemoveNode(old_node);
          try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
            old_node.parent = new_dir;
          } catch (e) {
            throw e;
          } finally {
            FS.hashAddNode(old_node);
          }
        }, rmdir(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, true);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.rmdir(parent, name);
          FS.destroyNode(node);
        }, readdir(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
          return readdir(node);
        }, unlink(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, false);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.unlink(parent, name);
          FS.destroyNode(node);
        }, readlink(path) {
          var lookup = FS.lookupPath(path);
          var link = lookup.node;
          if (!link) {
            throw new FS.ErrnoError(44);
          }
          if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28);
          }
          return link.node_ops.readlink(link);
        }, stat(path, dontFollow) {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          var node = lookup.node;
          var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
          return getattr(node);
        }, fstat(fd) {
          var stream = FS.getStreamChecked(fd);
          var node = stream.node;
          var getattr = stream.stream_ops.getattr;
          var arg = getattr ? stream : node;
          getattr ??= node.node_ops.getattr;
          FS.checkOpExists(getattr, 63);
          return getattr(arg);
        }, lstat(path) {
          return FS.stat(path, true);
        }, doChmod(stream, node, mode, dontFollow) {
          FS.doSetAttr(stream, node, { mode: mode & 4095 | node.mode & ~4095, ctime: Date.now(), dontFollow });
        }, chmod(path, mode, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChmod(null, node, mode, dontFollow);
        }, lchmod(path, mode) {
          FS.chmod(path, mode, true);
        }, fchmod(fd, mode) {
          var stream = FS.getStreamChecked(fd);
          FS.doChmod(stream, stream.node, mode, false);
        }, doChown(stream, node, dontFollow) {
          FS.doSetAttr(stream, node, { timestamp: Date.now(), dontFollow });
        }, chown(path, uid, gid, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChown(null, node, dontFollow);
        }, lchown(path, uid, gid) {
          FS.chown(path, uid, gid, true);
        }, fchown(fd, uid, gid) {
          var stream = FS.getStreamChecked(fd);
          FS.doChown(stream, stream.node, false);
        }, doTruncate(stream, node, len) {
          if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.nodePermissions(node, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.doSetAttr(stream, node, { size: len, timestamp: Date.now() });
        }, truncate(path, len) {
          if (len < 0) {
            throw new FS.ErrnoError(28);
          }
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: true });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doTruncate(null, node, len);
        }, ftruncate(fd, len) {
          var stream = FS.getStreamChecked(fd);
          if (len < 0 || (stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.doTruncate(stream, stream.node, len);
        }, utime(path, atime, mtime) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
          setattr(node, { atime, mtime });
        }, open(path, flags, mode = 438) {
          if (path === "") {
            throw new FS.ErrnoError(44);
          }
          flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
          if (flags & 64) {
            mode = mode & 4095 | 32768;
          } else {
            mode = 0;
          }
          var node;
          var isDirPath;
          if (typeof path == "object") {
            node = path;
          } else {
            isDirPath = path.endsWith("/");
            var lookup = FS.lookupPath(path, { follow: !(flags & 131072), noent_okay: true });
            node = lookup.node;
            path = lookup.path;
          }
          var created = false;
          if (flags & 64) {
            if (node) {
              if (flags & 128) {
                throw new FS.ErrnoError(20);
              }
            } else if (isDirPath) {
              throw new FS.ErrnoError(31);
            } else {
              node = FS.mknod(path, mode | 511, 0);
              created = true;
            }
          }
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (FS.isChrdev(node.mode)) {
            flags &= ~512;
          }
          if (flags & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
          if (!created) {
            var errCode = FS.mayOpen(node, flags);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          if (flags & 512 && !created) {
            FS.truncate(node, 0);
          }
          flags &= ~(128 | 512 | 131072);
          var stream = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
          if (created) {
            FS.chmod(node, mode & 511);
          }
          if (Module2["logReadFiles"] && !(flags & 1)) {
            if (!(path in FS.readFiles)) {
              FS.readFiles[path] = 1;
            }
          }
          return stream;
        }, close(stream) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (stream.getdents) stream.getdents = null;
          try {
            if (stream.stream_ops.close) {
              stream.stream_ops.close(stream);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream.fd);
          }
          stream.fd = null;
        }, isClosed(stream) {
          return stream.fd === null;
        }, llseek(stream, offset, whence) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream.position = stream.stream_ops.llseek(stream, offset, whence);
          stream.ungotten = [];
          return stream.position;
        }, read(stream, buffer, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
          if (!seeking) stream.position += bytesRead;
          return bytesRead;
        }, write(stream, buffer, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream.seekable && stream.flags & 1024) {
            FS.llseek(stream, 0, 2);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
          if (!seeking) stream.position += bytesWritten;
          return bytesWritten;
        }, mmap(stream, length, position, prot, flags) {
          if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          if (!length) {
            throw new FS.ErrnoError(28);
          }
          return stream.stream_ops.mmap(stream, length, position, prot, flags);
        }, msync(stream, buffer, offset, length, mmapFlags) {
          if (!stream.stream_ops.msync) {
            return 0;
          }
          return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
        }, ioctl(stream, cmd, arg) {
          if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream.stream_ops.ioctl(stream, cmd, arg);
        }, readFile(path, opts = {}) {
          opts.flags = opts.flags || 0;
          opts.encoding = opts.encoding || "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error(`Invalid encoding type "${opts.encoding}"`);
          }
          var stream = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            buf = UTF8ArrayToString(buf);
          }
          FS.close(stream);
          return buf;
        }, writeFile(path, data, opts = {}) {
          opts.flags = opts.flags || 577;
          var stream = FS.open(path, opts.flags, opts.mode);
          if (typeof data == "string") {
            data = new Uint8Array(intArrayFromString(data, true));
          }
          if (ArrayBuffer.isView(data)) {
            FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
          } else {
            throw new Error("Unsupported data type");
          }
          FS.close(stream);
        }, cwd: () => FS.currentPath, chdir(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          if (lookup.node === null) {
            throw new FS.ErrnoError(44);
          }
          if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(54);
          }
          var errCode = FS.nodePermissions(lookup.node, "x");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.currentPath = lookup.path;
        }, createDefaultDirectories() {
          FS.mkdir("/tmp");
          FS.mkdir("/home");
          FS.mkdir("/home/web_user");
        }, createDefaultDevices() {
          FS.mkdir("/dev");
          FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length, llseek: () => 0 });
          FS.mkdev("/dev/null", FS.makedev(1, 3));
          TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
          TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
          FS.mkdev("/dev/tty", FS.makedev(5, 0));
          FS.mkdev("/dev/tty1", FS.makedev(6, 0));
          var randomBuffer = new Uint8Array(1024), randomLeft = 0;
          var randomByte = () => {
            if (randomLeft === 0) {
              randomFill(randomBuffer);
              randomLeft = randomBuffer.byteLength;
            }
            return randomBuffer[--randomLeft];
          };
          FS.createDevice("/dev", "random", randomByte);
          FS.createDevice("/dev", "urandom", randomByte);
          FS.mkdir("/dev/shm");
          FS.mkdir("/dev/shm/tmp");
        }, createSpecialDirectories() {
          FS.mkdir("/proc");
          var proc_self = FS.mkdir("/proc/self");
          FS.mkdir("/proc/self/fd");
          FS.mount({ mount() {
            var node = FS.createNode(proc_self, "fd", 16895, 73);
            node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
            node.node_ops = { lookup(parent, name) {
              var fd = +name;
              var stream = FS.getStreamChecked(fd);
              var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path }, id: fd + 1 };
              ret.parent = ret;
              return ret;
            }, readdir() {
              return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
            } };
            return node;
          } }, {}, "/proc/self/fd");
        }, createStandardStreams(input, output, error) {
          if (input) {
            FS.createDevice("/dev", "stdin", input);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (output) {
            FS.createDevice("/dev", "stdout", null, output);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (error) {
            FS.createDevice("/dev", "stderr", null, error);
          } else {
            FS.symlink("/dev/tty1", "/dev/stderr");
          }
          var stdin = FS.open("/dev/stdin", 0);
          var stdout = FS.open("/dev/stdout", 1);
          var stderr = FS.open("/dev/stderr", 1);
        }, staticInit() {
          FS.nameTable = new Array(4096);
          FS.mount(MEMFS, {}, "/");
          FS.createDefaultDirectories();
          FS.createDefaultDevices();
          FS.createSpecialDirectories();
          FS.filesystems = { MEMFS };
        }, init(input, output, error) {
          FS.initialized = true;
          input ??= Module2["stdin"];
          output ??= Module2["stdout"];
          error ??= Module2["stderr"];
          FS.createStandardStreams(input, output, error);
        }, quit() {
          FS.initialized = false;
          for (var stream of FS.streams) {
            if (stream) {
              FS.close(stream);
            }
          }
        }, findObject(path, dontResolveLastLink) {
          var ret = FS.analyzePath(path, dontResolveLastLink);
          if (!ret.exists) {
            return null;
          }
          return ret.object;
        }, analyzePath(path, dontResolveLastLink) {
          try {
            var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            path = lookup.path;
          } catch (e) {
          }
          var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
          try {
            var lookup = FS.lookupPath(path, { parent: true });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === "/";
          } catch (e) {
            ret.error = e.errno;
          }
          return ret;
        }, createPath(parent, path, canRead, canWrite) {
          parent = typeof parent == "string" ? parent : FS.getPath(parent);
          var parts = path.split("/").reverse();
          while (parts.length) {
            var part = parts.pop();
            if (!part) continue;
            var current = PATH.join2(parent, part);
            try {
              FS.mkdir(current);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
            parent = current;
          }
          return current;
        }, createFile(parent, name, properties, canRead, canWrite) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(canRead, canWrite);
          return FS.create(path, mode);
        }, createDataFile(parent, name, data, canRead, canWrite, canOwn) {
          var path = name;
          if (parent) {
            parent = typeof parent == "string" ? parent : FS.getPath(parent);
            path = name ? PATH.join2(parent, name) : parent;
          }
          var mode = FS_getMode(canRead, canWrite);
          var node = FS.create(path, mode);
          if (data) {
            if (typeof data == "string") {
              var arr = new Array(data.length);
              for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
              data = arr;
            }
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, 577);
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
          }
        }, createDevice(parent, name, input, output) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(!!input, !!output);
          FS.createDevice.major ??= 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, { open(stream) {
            stream.seekable = false;
          }, close(stream) {
            if (output?.buffer?.length) {
              output(10);
            }
          }, read(stream, buffer, offset, length, pos) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0) break;
              bytesRead++;
              buffer[offset + i] = result;
            }
            if (bytesRead) {
              stream.node.atime = Date.now();
            }
            return bytesRead;
          }, write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.mtime = stream.node.ctime = Date.now();
            }
            return i;
          } });
          return FS.mkdev(path, mode, dev);
        }, forceLoadFile(obj) {
          if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
          if (typeof XMLHttpRequest != "undefined") {
            throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          } else {
            try {
              obj.contents = readBinary(obj.url);
              obj.usedBytes = obj.contents.length;
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
          }
        }, createLazyFile(parent, name, url, canRead, canWrite) {
          class LazyUint8Array {
            lengthKnown = false;
            chunks = [];
            get(idx) {
              if (idx > this.length - 1 || idx < 0) {
                return void 0;
              }
              var chunkOffset = idx % this.chunkSize;
              var chunkNum = idx / this.chunkSize | 0;
              return this.getter(chunkNum)[chunkOffset];
            }
            setDataGetter(getter) {
              this.getter = getter;
            }
            cacheLength() {
              var xhr = new XMLHttpRequest();
              xhr.open("HEAD", url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
              var chunkSize = 1024 * 1024;
              if (!hasByteServing) chunkSize = datalength;
              var doXHR = (from, to) => {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", url, false);
                if (datalength !== chunkSize) xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
                xhr2.responseType = "arraybuffer";
                if (xhr2.overrideMimeType) {
                  xhr2.overrideMimeType("text/plain; charset=x-user-defined");
                }
                xhr2.send(null);
                if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
                if (xhr2.response !== void 0) {
                  return new Uint8Array(xhr2.response || []);
                }
                return intArrayFromString(xhr2.responseText || "", true);
              };
              var lazyArray2 = this;
              lazyArray2.setDataGetter((chunkNum) => {
                var start = chunkNum * chunkSize;
                var end = (chunkNum + 1) * chunkSize - 1;
                end = Math.min(end, datalength - 1);
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
                  lazyArray2.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
                return lazyArray2.chunks[chunkNum];
              });
              if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
              }
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
            }
            get length() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._length;
            }
            get chunkSize() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._chunkSize;
            }
          }
          if (typeof XMLHttpRequest != "undefined") {
            if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var lazyArray = new LazyUint8Array();
            var properties = { isDevice: false, contents: lazyArray };
          } else {
            var properties = { isDevice: false, url };
          }
          var node = FS.createFile(parent, name, properties, canRead, canWrite);
          if (properties.contents) {
            node.contents = properties.contents;
          } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
          }
          Object.defineProperties(node, { usedBytes: { get: function() {
            return this.contents.length;
          } } });
          var stream_ops = {};
          var keys = Object.keys(node.stream_ops);
          keys.forEach((key) => {
            var fn = node.stream_ops[key];
            stream_ops[key] = (...args) => {
              FS.forceLoadFile(node);
              return fn(...args);
            };
          });
          function writeChunks(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= contents.length) return 0;
            var size = Math.min(contents.length - position, length);
            if (contents.slice) {
              for (var i = 0; i < size; i++) {
                buffer[offset + i] = contents[position + i];
              }
            } else {
              for (var i = 0; i < size; i++) {
                buffer[offset + i] = contents.get(position + i);
              }
            }
            return size;
          }
          stream_ops.read = (stream, buffer, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream, buffer, offset, length, position);
          };
          stream_ops.mmap = (stream, length, position, prot, flags) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            writeChunks(stream, HEAP8, ptr, length, position);
            return { ptr, allocated: true };
          };
          node.stream_ops = stream_ops;
          return node;
        } };
        var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt(dirfd, path, allowEmpty) {
          if (PATH.isAbs(path)) {
            return path;
          }
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = SYSCALLS.getStreamFromFD(dirfd);
            dir = dirstream.path;
          }
          if (path.length == 0) {
            if (!allowEmpty) {
              throw new FS.ErrnoError(44);
            }
            return dir;
          }
          return dir + "/" + path;
        }, writeStat(buf, stat) {
          HEAP32[buf >> 2] = stat.dev;
          HEAP32[buf + 4 >> 2] = stat.mode;
          HEAPU32[buf + 8 >> 2] = stat.nlink;
          HEAP32[buf + 12 >> 2] = stat.uid;
          HEAP32[buf + 16 >> 2] = stat.gid;
          HEAP32[buf + 20 >> 2] = stat.rdev;
          tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 24 >> 2] = tempI64[0], HEAP32[buf + 28 >> 2] = tempI64[1];
          HEAP32[buf + 32 >> 2] = 4096;
          HEAP32[buf + 36 >> 2] = stat.blocks;
          var atime = stat.atime.getTime();
          var mtime = stat.mtime.getTime();
          var ctime = stat.ctime.getTime();
          tempI64 = [Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
          HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
          tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
          HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
          tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
          HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
          tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
          return 0;
        }, writeStatFs(buf, stats) {
          HEAP32[buf + 4 >> 2] = stats.bsize;
          HEAP32[buf + 40 >> 2] = stats.bsize;
          HEAP32[buf + 8 >> 2] = stats.blocks;
          HEAP32[buf + 12 >> 2] = stats.bfree;
          HEAP32[buf + 16 >> 2] = stats.bavail;
          HEAP32[buf + 20 >> 2] = stats.files;
          HEAP32[buf + 24 >> 2] = stats.ffree;
          HEAP32[buf + 28 >> 2] = stats.fsid;
          HEAP32[buf + 44 >> 2] = stats.flags;
          HEAP32[buf + 36 >> 2] = stats.namelen;
        }, doMsync(addr, stream, len, flags, offset) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (flags & 2) {
            return 0;
          }
          var buffer = HEAPU8.slice(addr, addr + len);
          FS.msync(stream, buffer, offset, len, flags);
        }, getStreamFromFD(fd) {
          var stream = FS.getStreamChecked(fd);
          return stream;
        }, varargs: void 0, getStr(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        } };
        function ___syscall_chmod(path, mode) {
          try {
            path = SYSCALLS.getStr(path);
            FS.chmod(path, mode);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_faccessat(dirfd, path, amode, flags) {
          try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            if (amode & ~7) {
              return -28;
            }
            var lookup = FS.lookupPath(path, { follow: true });
            var node = lookup.node;
            if (!node) {
              return -44;
            }
            var perms = "";
            if (amode & 4) perms += "r";
            if (amode & 2) perms += "w";
            if (amode & 1) perms += "x";
            if (perms && FS.nodePermissions(node, perms)) {
              return -2;
            }
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_fchmod(fd, mode) {
          try {
            FS.fchmod(fd, mode);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_fchown32(fd, owner, group) {
          try {
            FS.fchown(fd, owner, group);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        var syscallGetVarargI = () => {
          var ret = HEAP32[+SYSCALLS.varargs >> 2];
          SYSCALLS.varargs += 4;
          return ret;
        };
        var syscallGetVarargP = syscallGetVarargI;
        function ___syscall_fcntl64(fd, cmd, varargs) {
          SYSCALLS.varargs = varargs;
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            switch (cmd) {
              case 0: {
                var arg = syscallGetVarargI();
                if (arg < 0) {
                  return -28;
                }
                while (FS.streams[arg]) {
                  arg++;
                }
                var newStream;
                newStream = FS.dupStream(stream, arg);
                return newStream.fd;
              }
              case 1:
              case 2:
                return 0;
              case 3:
                return stream.flags;
              case 4: {
                var arg = syscallGetVarargI();
                stream.flags |= arg;
                return 0;
              }
              case 12: {
                var arg = syscallGetVarargP();
                var offset = 0;
                HEAP16[arg + offset >> 1] = 2;
                return 0;
              }
              case 13:
              case 14:
                return 0;
            }
            return -28;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_fstat64(fd, buf) {
          try {
            return SYSCALLS.writeStat(buf, FS.fstat(fd));
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        var convertI32PairToI53Checked = (lo, hi) => hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
        function ___syscall_ftruncate64(fd, length_low, length_high) {
          var length = convertI32PairToI53Checked(length_low, length_high);
          try {
            if (isNaN(length)) return -61;
            FS.ftruncate(fd, length);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
        function ___syscall_getcwd(buf, size) {
          try {
            if (size === 0) return -28;
            var cwd = FS.cwd();
            var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
            if (size < cwdLengthInBytes) return -68;
            stringToUTF8(cwd, buf, size);
            return cwdLengthInBytes;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_lstat64(path, buf) {
          try {
            path = SYSCALLS.getStr(path);
            return SYSCALLS.writeStat(buf, FS.lstat(path));
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_mkdirat(dirfd, path, mode) {
          try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            FS.mkdir(path, mode, 0);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_newfstatat(dirfd, path, buf, flags) {
          try {
            path = SYSCALLS.getStr(path);
            var nofollow = flags & 256;
            var allowEmpty = flags & 4096;
            flags = flags & ~6400;
            path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
            return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_openat(dirfd, path, flags, varargs) {
          SYSCALLS.varargs = varargs;
          try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            var mode = varargs ? syscallGetVarargI() : 0;
            return FS.open(path, flags, mode).fd;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
          try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            if (bufsize <= 0) return -28;
            var ret = FS.readlink(path);
            var len = Math.min(bufsize, lengthBytesUTF8(ret));
            var endChar = HEAP8[buf + len];
            stringToUTF8(ret, buf, bufsize + 1);
            HEAP8[buf + len] = endChar;
            return len;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_rmdir(path) {
          try {
            path = SYSCALLS.getStr(path);
            FS.rmdir(path);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_stat64(path, buf) {
          try {
            path = SYSCALLS.getStr(path);
            return SYSCALLS.writeStat(buf, FS.stat(path));
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function ___syscall_unlinkat(dirfd, path, flags) {
          try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            if (!flags) {
              FS.unlink(path);
            } else if (flags === 512) {
              FS.rmdir(path);
            } else {
              return -28;
            }
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        var readI53FromI64 = (ptr) => HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296;
        function ___syscall_utimensat(dirfd, path, times, flags) {
          try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path, true);
            var now = Date.now(), atime, mtime;
            if (!times) {
              atime = now;
              mtime = now;
            } else {
              var seconds = readI53FromI64(times);
              var nanoseconds = HEAP32[times + 8 >> 2];
              if (nanoseconds == 1073741823) {
                atime = now;
              } else if (nanoseconds == 1073741822) {
                atime = null;
              } else {
                atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
              }
              times += 16;
              seconds = readI53FromI64(times);
              nanoseconds = HEAP32[times + 8 >> 2];
              if (nanoseconds == 1073741823) {
                mtime = now;
              } else if (nanoseconds == 1073741822) {
                mtime = null;
              } else {
                mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
              }
            }
            if ((mtime ?? atime) !== null) {
              FS.utime(path, atime, mtime);
            }
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        var __abort_js = () => abort("");
        var runtimeKeepaliveCounter = 0;
        var __emscripten_runtime_keepalive_clear = () => {
          noExitRuntime = false;
          runtimeKeepaliveCounter = 0;
        };
        var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
        var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var ydayFromDate = (date) => {
          var leap = isLeapYear(date.getFullYear());
          var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
          var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
          return yday;
        };
        function __localtime_js(time_low, time_high, tmPtr) {
          var time = convertI32PairToI53Checked(time_low, time_high);
          var date = new Date(time * 1e3);
          HEAP32[tmPtr >> 2] = date.getSeconds();
          HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
          HEAP32[tmPtr + 8 >> 2] = date.getHours();
          HEAP32[tmPtr + 12 >> 2] = date.getDate();
          HEAP32[tmPtr + 16 >> 2] = date.getMonth();
          HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
          HEAP32[tmPtr + 24 >> 2] = date.getDay();
          var yday = ydayFromDate(date) | 0;
          HEAP32[tmPtr + 28 >> 2] = yday;
          HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
          var start = new Date(date.getFullYear(), 0, 1);
          var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
          var winterOffset = start.getTimezoneOffset();
          var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
          HEAP32[tmPtr + 32 >> 2] = dst;
        }
        function __mmap_js(len, prot, flags, fd, offset_low, offset_high, allocated, addr) {
          var offset = convertI32PairToI53Checked(offset_low, offset_high);
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var res = FS.mmap(stream, len, offset, prot, flags);
            var ptr = res.ptr;
            HEAP32[allocated >> 2] = res.allocated;
            HEAPU32[addr >> 2] = ptr;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        function __munmap_js(addr, len, prot, flags, fd, offset_low, offset_high) {
          var offset = convertI32PairToI53Checked(offset_low, offset_high);
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            if (prot & 2) {
              SYSCALLS.doMsync(addr, stream, len, flags, offset);
            }
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return -e.errno;
          }
        }
        var timers = {};
        var handleException = (e) => {
          if (e instanceof ExitStatus || e == "unwind") {
            return EXITSTATUS;
          }
          quit_(1, e);
        };
        var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
        var _proc_exit = (code) => {
          EXITSTATUS = code;
          if (!keepRuntimeAlive()) {
            Module2["onExit"]?.(code);
            ABORT = true;
          }
          quit_(code, new ExitStatus(code));
        };
        var exitJS = (status, implicit) => {
          EXITSTATUS = status;
          _proc_exit(status);
        };
        var _exit = exitJS;
        var maybeExit = () => {
          if (!keepRuntimeAlive()) {
            try {
              _exit(EXITSTATUS);
            } catch (e) {
              handleException(e);
            }
          }
        };
        var callUserCallback = (func) => {
          if (ABORT) {
            return;
          }
          try {
            func();
            maybeExit();
          } catch (e) {
            handleException(e);
          }
        };
        var _emscripten_get_now = () => performance.now();
        var __setitimer_js = (which, timeout_ms) => {
          if (timers[which]) {
            clearTimeout(timers[which].id);
            delete timers[which];
          }
          if (!timeout_ms) return 0;
          var id = setTimeout(() => {
            delete timers[which];
            callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
          }, timeout_ms);
          timers[which] = { id, timeout_ms };
          return 0;
        };
        var __tzset_js = (timezone, daylight, std_name, dst_name) => {
          var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
          var winter = new Date(currentYear, 0, 1);
          var summer = new Date(currentYear, 6, 1);
          var winterOffset = winter.getTimezoneOffset();
          var summerOffset = summer.getTimezoneOffset();
          var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
          HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
          HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
          var extractZone = (timezoneOffset) => {
            var sign = timezoneOffset >= 0 ? "-" : "+";
            var absOffset = Math.abs(timezoneOffset);
            var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
            var minutes = String(absOffset % 60).padStart(2, "0");
            return `UTC${sign}${hours}${minutes}`;
          };
          var winterName = extractZone(winterOffset);
          var summerName = extractZone(summerOffset);
          if (summerOffset < winterOffset) {
            stringToUTF8(winterName, std_name, 17);
            stringToUTF8(summerName, dst_name, 17);
          } else {
            stringToUTF8(winterName, dst_name, 17);
            stringToUTF8(summerName, std_name, 17);
          }
        };
        var _emscripten_date_now = () => Date.now();
        var getHeapMax = () => 2147483648;
        var growMemory = (size) => {
          var b = wasmMemory.buffer;
          var pages = (size - b.byteLength + 65535) / 65536 | 0;
          try {
            wasmMemory.grow(pages);
            updateMemoryViews();
            return 1;
          } catch (e) {
          }
        };
        var _emscripten_resize_heap = (requestedSize) => {
          var oldSize = HEAPU8.length;
          requestedSize >>>= 0;
          var maxHeapSize = getHeapMax();
          if (requestedSize > maxHeapSize) {
            return false;
          }
          for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
            var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
            overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
            var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
            var replacement = growMemory(newSize);
            if (replacement) {
              return true;
            }
          }
          return false;
        };
        var ENV = {};
        var getExecutableName = () => thisProgram || "./this.program";
        var getEnvStrings = () => {
          if (!getEnvStrings.strings) {
            var lang = (typeof navigator == "object" && navigator.language || "C").replace("-", "_") + ".UTF-8";
            var env = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: lang, _: getExecutableName() };
            for (var x in ENV) {
              if (ENV[x] === void 0) delete env[x];
              else env[x] = ENV[x];
            }
            var strings = [];
            for (var x in env) {
              strings.push(`${x}=${env[x]}`);
            }
            getEnvStrings.strings = strings;
          }
          return getEnvStrings.strings;
        };
        var _environ_get = (__environ, environ_buf) => {
          var bufSize = 0;
          var envp = 0;
          for (var string of getEnvStrings()) {
            var ptr = environ_buf + bufSize;
            HEAPU32[__environ + envp >> 2] = ptr;
            bufSize += stringToUTF8(string, ptr, Infinity) + 1;
            envp += 4;
          }
          return 0;
        };
        var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
          var strings = getEnvStrings();
          HEAPU32[penviron_count >> 2] = strings.length;
          var bufSize = 0;
          for (var string of strings) {
            bufSize += lengthBytesUTF8(string) + 1;
          }
          HEAPU32[penviron_buf_size >> 2] = bufSize;
          return 0;
        };
        function _fd_close(fd) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        function _fd_fdstat_get(fd, pbuf) {
          try {
            var rightsBase = 0;
            var rightsInheriting = 0;
            var flags = 0;
            {
              var stream = SYSCALLS.getStreamFromFD(fd);
              var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
            }
            HEAP8[pbuf] = type;
            HEAP16[pbuf + 2 >> 1] = flags;
            tempI64 = [rightsBase >>> 0, (tempDouble = rightsBase, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[pbuf + 8 >> 2] = tempI64[0], HEAP32[pbuf + 12 >> 2] = tempI64[1];
            tempI64 = [rightsInheriting >>> 0, (tempDouble = rightsInheriting, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[pbuf + 16 >> 2] = tempI64[0], HEAP32[pbuf + 20 >> 2] = tempI64[1];
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var doReadv = (stream, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) break;
            if (typeof offset != "undefined") {
              offset += curr;
            }
          }
          return ret;
        };
        function _fd_read(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
          var offset = convertI32PairToI53Checked(offset_low, offset_high);
          try {
            if (isNaN(offset)) return 61;
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.llseek(stream, offset, whence);
            tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
            if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        function _fd_sync(fd) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            if (stream.stream_ops?.fsync) {
              return stream.stream_ops.fsync(stream);
            }
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var doWritev = (stream, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.write(stream, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) {
              break;
            }
            if (typeof offset != "undefined") {
              offset += curr;
            }
          }
          return ret;
        };
        function _fd_write(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doWritev(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var adapters_support = function() {
          const handleAsync = typeof Asyncify === "object" ? Asyncify.handleAsync.bind(Asyncify) : null;
          Module2["handleAsync"] = handleAsync;
          const targets = /* @__PURE__ */ new Map();
          Module2["setCallback"] = (key, target) => targets.set(key, target);
          Module2["getCallback"] = (key) => targets.get(key);
          Module2["deleteCallback"] = (key) => targets.delete(key);
          adapters_support = function(isAsync, key, ...args) {
            const receiver = targets.get(key);
            let methodName = null;
            const f = typeof receiver === "function" ? receiver : receiver[methodName = UTF8ToString(args.shift())];
            if (isAsync) {
              if (handleAsync) {
                return handleAsync(() => f.apply(receiver, args));
              }
              throw new Error("Synchronous WebAssembly cannot call async function");
            }
            const result = f.apply(receiver, args);
            if (typeof result?.then == "function") {
              console.error("unexpected Promise", f);
              throw new Error(`${methodName} unexpectedly returned a Promise`);
            }
            return result;
          };
        };
        function _ipp(...args) {
          return adapters_support(false, ...args);
        }
        function _ipp_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ippipppp(...args) {
          return adapters_support(false, ...args);
        }
        function _ippipppp_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ippp(...args) {
          return adapters_support(false, ...args);
        }
        function _ippp_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ipppi(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppi_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ipppiii(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppiii_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ipppiiip(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppiiip_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ipppip(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppip_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ipppj(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppj_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ipppp(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppp_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ippppi(...args) {
          return adapters_support(false, ...args);
        }
        function _ippppi_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ippppij(...args) {
          return adapters_support(false, ...args);
        }
        function _ippppij_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ippppip(...args) {
          return adapters_support(false, ...args);
        }
        function _ippppip_async(...args) {
          return adapters_support(true, ...args);
        }
        function _ipppppip(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppppip_async(...args) {
          return adapters_support(true, ...args);
        }
        function _vppippii(...args) {
          return adapters_support(false, ...args);
        }
        function _vppippii_async(...args) {
          return adapters_support(true, ...args);
        }
        function _vppp(...args) {
          return adapters_support(false, ...args);
        }
        function _vppp_async(...args) {
          return adapters_support(true, ...args);
        }
        function _vpppip(...args) {
          return adapters_support(false, ...args);
        }
        function _vpppip_async(...args) {
          return adapters_support(true, ...args);
        }
        var uleb128Encode = (n, target) => {
          if (n < 128) {
            target.push(n);
          } else {
            target.push(n % 128 | 128, n >> 7);
          }
        };
        var sigToWasmTypes = (sig) => {
          var typeNames = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" };
          var type = { parameters: [], results: sig[0] == "v" ? [] : [typeNames[sig[0]]] };
          for (var i = 1; i < sig.length; ++i) {
            type.parameters.push(typeNames[sig[i]]);
          }
          return type;
        };
        var generateFuncType = (sig, target) => {
          var sigRet = sig.slice(0, 1);
          var sigParam = sig.slice(1);
          var typeCodes = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 };
          target.push(96);
          uleb128Encode(sigParam.length, target);
          for (var paramType of sigParam) {
            target.push(typeCodes[paramType]);
          }
          if (sigRet == "v") {
            target.push(0);
          } else {
            target.push(1, typeCodes[sigRet]);
          }
        };
        var convertJsFunctionToWasm = (func, sig) => {
          if (typeof WebAssembly.Function == "function") {
            return new WebAssembly.Function(sigToWasmTypes(sig), func);
          }
          var typeSectionBody = [1];
          generateFuncType(sig, typeSectionBody);
          var bytes = [0, 97, 115, 109, 1, 0, 0, 0, 1];
          uleb128Encode(typeSectionBody.length, bytes);
          bytes.push(...typeSectionBody);
          bytes.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
          var module2 = new WebAssembly.Module(new Uint8Array(bytes));
          var instance = new WebAssembly.Instance(module2, { e: { f: func } });
          var wrappedFunc = instance.exports["f"];
          return wrappedFunc;
        };
        var wasmTable;
        var getWasmTableEntry = (funcPtr) => wasmTable.get(funcPtr);
        var updateTableMap = (offset, count) => {
          if (functionsInTableMap) {
            for (var i = offset; i < offset + count; i++) {
              var item = getWasmTableEntry(i);
              if (item) {
                functionsInTableMap.set(item, i);
              }
            }
          }
        };
        var functionsInTableMap;
        var getFunctionAddress = (func) => {
          if (!functionsInTableMap) {
            functionsInTableMap = /* @__PURE__ */ new WeakMap();
            updateTableMap(0, wasmTable.length);
          }
          return functionsInTableMap.get(func) || 0;
        };
        var freeTableIndexes = [];
        var getEmptyTableSlot = () => {
          if (freeTableIndexes.length) {
            return freeTableIndexes.pop();
          }
          try {
            wasmTable.grow(1);
          } catch (err2) {
            if (!(err2 instanceof RangeError)) {
              throw err2;
            }
            throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
          }
          return wasmTable.length - 1;
        };
        var setWasmTableEntry = (idx, func) => wasmTable.set(idx, func);
        var addFunction = (func, sig) => {
          var rtn = getFunctionAddress(func);
          if (rtn) {
            return rtn;
          }
          var ret = getEmptyTableSlot();
          try {
            setWasmTableEntry(ret, func);
          } catch (err2) {
            if (!(err2 instanceof TypeError)) {
              throw err2;
            }
            var wrapped = convertJsFunctionToWasm(func, sig);
            setWasmTableEntry(ret, wrapped);
          }
          functionsInTableMap.set(func, ret);
          return ret;
        };
        var getCFunc = (ident) => {
          var func = Module2["_" + ident];
          return func;
        };
        var writeArrayToMemory = (array, buffer) => {
          HEAP8.set(array, buffer);
        };
        var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
        var stringToUTF8OnStack = (str) => {
          var size = lengthBytesUTF8(str) + 1;
          var ret = stackAlloc(size);
          stringToUTF8(str, ret, size);
          return ret;
        };
        var ccall = (ident, returnType, argTypes, args, opts) => {
          var toC = { string: (str) => {
            var ret2 = 0;
            if (str !== null && str !== void 0 && str !== 0) {
              ret2 = stringToUTF8OnStack(str);
            }
            return ret2;
          }, array: (arr) => {
            var ret2 = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret2);
            return ret2;
          } };
          function convertReturnValue(ret2) {
            if (returnType === "string") {
              return UTF8ToString(ret2);
            }
            if (returnType === "boolean") return Boolean(ret2);
            return ret2;
          }
          var func = getCFunc(ident);
          var cArgs = [];
          var stack = 0;
          if (args) {
            for (var i = 0; i < args.length; i++) {
              var converter = toC[argTypes[i]];
              if (converter) {
                if (stack === 0) stack = stackSave();
                cArgs[i] = converter(args[i]);
              } else {
                cArgs[i] = args[i];
              }
            }
          }
          var ret = func(...cArgs);
          function onDone(ret2) {
            if (stack !== 0) stackRestore(stack);
            return convertReturnValue(ret2);
          }
          ret = onDone(ret);
          return ret;
        };
        var cwrap = (ident, returnType, argTypes, opts) => {
          var numericArgs = !argTypes || argTypes.every((type) => type === "number" || type === "boolean");
          var numericRet = returnType !== "string";
          if (numericRet && numericArgs && !opts) {
            return getCFunc(ident);
          }
          return (...args) => ccall(ident, returnType, argTypes, args, opts);
        };
        var getTempRet0 = (val) => __emscripten_tempret_get();
        var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
          maxBytesToWrite ??= 2147483647;
          if (maxBytesToWrite < 2) return 0;
          maxBytesToWrite -= 2;
          var startPtr = outPtr;
          var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
          for (var i = 0; i < numCharsToWrite; ++i) {
            var codeUnit = str.charCodeAt(i);
            HEAP16[outPtr >> 1] = codeUnit;
            outPtr += 2;
          }
          HEAP16[outPtr >> 1] = 0;
          return outPtr - startPtr;
        };
        var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
          maxBytesToWrite ??= 2147483647;
          if (maxBytesToWrite < 4) return 0;
          var startPtr = outPtr;
          var endPtr = startPtr + maxBytesToWrite - 4;
          for (var i = 0; i < str.length; ++i) {
            var codePoint = str.codePointAt(i);
            if (codePoint > 65535) {
              i++;
            }
            HEAP32[outPtr >> 2] = codePoint;
            outPtr += 4;
            if (outPtr + 4 > endPtr) break;
          }
          HEAP32[outPtr >> 2] = 0;
          return outPtr - startPtr;
        };
        var AsciiToString = (ptr) => {
          var str = "";
          while (1) {
            var ch = HEAPU8[ptr++];
            if (!ch) return str;
            str += String.fromCharCode(ch);
          }
        };
        var UTF16Decoder = new TextDecoder("utf-16le");
        var UTF16ToString = (ptr, maxBytesToRead) => {
          var idx = ptr >> 1;
          var maxIdx = idx + maxBytesToRead / 2;
          var endIdx = idx;
          while (!(endIdx >= maxIdx) && HEAPU16[endIdx]) ++endIdx;
          return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
        };
        var UTF32ToString = (ptr, maxBytesToRead) => {
          var str = "";
          for (var i = 0; !(i >= maxBytesToRead / 4); i++) {
            var utf32 = HEAP32[ptr + i * 4 >> 2];
            if (!utf32) break;
            str += String.fromCodePoint(utf32);
          }
          return str;
        };
        var intArrayToString = (array) => {
          var ret = [];
          for (var i = 0; i < array.length; i++) {
            var chr = array[i];
            if (chr > 255) {
              chr &= 255;
            }
            ret.push(String.fromCharCode(chr));
          }
          return ret.join("");
        };
        FS.createPreloadedFile = FS_createPreloadedFile;
        FS.staticInit();
        MEMFS.doesNotExistError = new FS.ErrnoError(44);
        MEMFS.doesNotExistError.stack = "<generic error, no stack>";
        adapters_support();
        {
          if (Module2["noExitRuntime"]) noExitRuntime = Module2["noExitRuntime"];
          if (Module2["preloadPlugins"]) preloadPlugins = Module2["preloadPlugins"];
          if (Module2["print"]) out = Module2["print"];
          if (Module2["printErr"]) err = Module2["printErr"];
          if (Module2["wasmBinary"]) wasmBinary = Module2["wasmBinary"];
          if (Module2["arguments"]) arguments_ = Module2["arguments"];
          if (Module2["thisProgram"]) thisProgram = Module2["thisProgram"];
        }
        Module2["getTempRet0"] = getTempRet0;
        Module2["ccall"] = ccall;
        Module2["cwrap"] = cwrap;
        Module2["addFunction"] = addFunction;
        Module2["setValue"] = setValue;
        Module2["getValue"] = getValue;
        Module2["UTF8ToString"] = UTF8ToString;
        Module2["stringToUTF8"] = stringToUTF8;
        Module2["lengthBytesUTF8"] = lengthBytesUTF8;
        Module2["intArrayFromString"] = intArrayFromString;
        Module2["intArrayToString"] = intArrayToString;
        Module2["AsciiToString"] = AsciiToString;
        Module2["UTF16ToString"] = UTF16ToString;
        Module2["stringToUTF16"] = stringToUTF16;
        Module2["UTF32ToString"] = UTF32ToString;
        Module2["stringToUTF32"] = stringToUTF32;
        Module2["writeArrayToMemory"] = writeArrayToMemory;
        var _sqlite3_status64, _sqlite3_status, _sqlite3_db_status, _sqlite3_msize, _sqlite3_vfs_find, _sqlite3_vfs_register, _sqlite3_vfs_unregister, _sqlite3_release_memory, _sqlite3_soft_heap_limit64, _sqlite3_memory_used, _sqlite3_hard_heap_limit64, _sqlite3_memory_highwater, _sqlite3_malloc, _sqlite3_malloc64, _sqlite3_free, _sqlite3_realloc, _sqlite3_realloc64, _sqlite3_str_vappendf, _sqlite3_str_append, _sqlite3_str_appendchar, _sqlite3_str_appendall, _sqlite3_str_appendf, _sqlite3_str_finish, _sqlite3_str_errcode, _sqlite3_str_length, _sqlite3_str_value, _sqlite3_str_reset, _sqlite3_str_new, _sqlite3_vmprintf, _sqlite3_mprintf, _sqlite3_vsnprintf, _sqlite3_snprintf, _sqlite3_log, _sqlite3_randomness, _sqlite3_stricmp, _sqlite3_strnicmp, _sqlite3_os_init, _sqlite3_os_end, _sqlite3_serialize, _sqlite3_prepare_v2, _sqlite3_step, _sqlite3_column_int64, _sqlite3_reset, _sqlite3_exec, _sqlite3_column_int, _sqlite3_finalize, _sqlite3_deserialize, _sqlite3_database_file_object, _sqlite3_backup_init, _sqlite3_backup_step, _sqlite3_backup_finish, _sqlite3_backup_remaining, _sqlite3_backup_pagecount, _sqlite3_clear_bindings, _sqlite3_value_blob, _sqlite3_value_text, _sqlite3_value_bytes, _sqlite3_value_bytes16, _sqlite3_value_double, _sqlite3_value_int, _sqlite3_value_int64, _sqlite3_value_subtype, _sqlite3_value_pointer, _sqlite3_value_text16, _sqlite3_value_text16be, _sqlite3_value_text16le, _sqlite3_value_type, _sqlite3_value_encoding, _sqlite3_value_nochange, _sqlite3_value_frombind, _sqlite3_value_dup, _sqlite3_value_free, _sqlite3_result_blob, _sqlite3_result_blob64, _sqlite3_result_double, _sqlite3_result_error, _sqlite3_result_error16, _sqlite3_result_int, _sqlite3_result_int64, _sqlite3_result_null, _sqlite3_result_pointer, _sqlite3_result_subtype, _sqlite3_result_text, _sqlite3_result_text64, _sqlite3_result_text16, _sqlite3_result_text16be, _sqlite3_result_text16le, _sqlite3_result_value, _sqlite3_result_error_toobig, _sqlite3_result_zeroblob, _sqlite3_result_zeroblob64, _sqlite3_result_error_code, _sqlite3_result_error_nomem, _sqlite3_user_data, _sqlite3_context_db_handle, _sqlite3_vtab_nochange, _sqlite3_vtab_in_first, _sqlite3_vtab_in_next, _sqlite3_aggregate_context, _sqlite3_get_auxdata, _sqlite3_set_auxdata, _sqlite3_column_count, _sqlite3_data_count, _sqlite3_column_blob, _sqlite3_column_bytes, _sqlite3_column_bytes16, _sqlite3_column_double, _sqlite3_column_text, _sqlite3_column_value, _sqlite3_column_text16, _sqlite3_column_type, _sqlite3_column_name, _sqlite3_column_name16, _sqlite3_bind_blob, _sqlite3_bind_blob64, _sqlite3_bind_double, _sqlite3_bind_int, _sqlite3_bind_int64, _sqlite3_bind_null, _sqlite3_bind_pointer, _sqlite3_bind_text, _sqlite3_bind_text64, _sqlite3_bind_text16, _sqlite3_bind_value, _sqlite3_bind_zeroblob, _sqlite3_bind_zeroblob64, _sqlite3_bind_parameter_count, _sqlite3_bind_parameter_name, _sqlite3_bind_parameter_index, _sqlite3_db_handle, _sqlite3_stmt_readonly, _sqlite3_stmt_isexplain, _sqlite3_stmt_explain, _sqlite3_stmt_busy, _sqlite3_next_stmt, _sqlite3_stmt_status, _sqlite3_sql, _sqlite3_expanded_sql, _sqlite3_value_numeric_type, _sqlite3_blob_open, _sqlite3_blob_close, _sqlite3_blob_read, _sqlite3_blob_write, _sqlite3_blob_bytes, _sqlite3_blob_reopen, _sqlite3_set_authorizer, _sqlite3_strglob, _sqlite3_strlike, _sqlite3_errmsg, _sqlite3_auto_extension, _sqlite3_cancel_auto_extension, _sqlite3_reset_auto_extension, _sqlite3_prepare, _sqlite3_prepare_v3, _sqlite3_prepare16, _sqlite3_prepare16_v2, _sqlite3_prepare16_v3, _sqlite3_get_table, _sqlite3_free_table, _sqlite3_create_module, _sqlite3_create_module_v2, _sqlite3_drop_modules, _sqlite3_declare_vtab, _sqlite3_vtab_on_conflict, _sqlite3_vtab_config, _sqlite3_vtab_collation, _sqlite3_vtab_in, _sqlite3_vtab_rhs_value, _sqlite3_vtab_distinct, _sqlite3_keyword_name, _sqlite3_keyword_count, _sqlite3_keyword_check, _sqlite3_complete, _sqlite3_complete16, _sqlite3_libversion, _sqlite3_libversion_number, _sqlite3_threadsafe, _sqlite3_initialize, _sqlite3_shutdown, _sqlite3_config, _sqlite3_db_mutex, _sqlite3_db_release_memory, _sqlite3_db_cacheflush, _sqlite3_db_config, _sqlite3_last_insert_rowid, _sqlite3_set_last_insert_rowid, _sqlite3_changes64, _sqlite3_changes, _sqlite3_total_changes64, _sqlite3_total_changes, _sqlite3_txn_state, _sqlite3_close, _sqlite3_close_v2, _sqlite3_busy_handler, _sqlite3_progress_handler, _sqlite3_busy_timeout, _sqlite3_interrupt, _sqlite3_is_interrupted, _sqlite3_create_function, _sqlite3_create_function_v2, _sqlite3_create_window_function, _sqlite3_create_function16, _sqlite3_overload_function, _sqlite3_trace_v2, _sqlite3_commit_hook, _sqlite3_update_hook, _sqlite3_rollback_hook, _sqlite3_autovacuum_pages, _sqlite3_wal_autocheckpoint, _sqlite3_wal_hook, _sqlite3_wal_checkpoint_v2, _sqlite3_wal_checkpoint, _sqlite3_error_offset, _sqlite3_errmsg16, _sqlite3_errcode, _sqlite3_extended_errcode, _sqlite3_system_errno, _sqlite3_errstr, _sqlite3_limit, _sqlite3_open, _sqlite3_open_v2, _sqlite3_open16, _sqlite3_create_collation, _sqlite3_create_collation_v2, _sqlite3_create_collation16, _sqlite3_collation_needed, _sqlite3_collation_needed16, _sqlite3_get_clientdata, _sqlite3_set_clientdata, _sqlite3_get_autocommit, _sqlite3_table_column_metadata, _sqlite3_sleep, _sqlite3_extended_result_codes, _sqlite3_file_control, _sqlite3_test_control, _sqlite3_create_filename, _sqlite3_free_filename, _sqlite3_uri_parameter, _sqlite3_uri_key, _sqlite3_uri_boolean, _sqlite3_uri_int64, _sqlite3_filename_database, _sqlite3_filename_journal, _sqlite3_filename_wal, _sqlite3_db_name, _sqlite3_db_filename, _sqlite3_db_readonly, _sqlite3_compileoption_used, _sqlite3_compileoption_get, _sqlite3session_create, _sqlite3session_delete, _sqlite3session_attach, _sqlite3session_changeset, _sqlite3session_enable, _sqlite3changeset_invert, _sqlite3changeset_apply, _sqlite3_sourceid, _malloc, _free, _RegisterExtensionFunctions, _getSqliteFree, _main, _libauthorizer_set_authorizer, _libfunction_create_function, _libhook_commit_hook, _libhook_update_hook, _libprogress_progress_handler, _libvfs_vfs_register, _emscripten_builtin_memalign, __emscripten_timeout, __emscripten_tempret_get, __emscripten_stack_restore, __emscripten_stack_alloc, _emscripten_stack_get_current, dynCall_viiiiijj, dynCall_viji, dynCall_viiiij, dynCall_iij, dynCall_iiiij, dynCall_iijii, dynCall_iiji, dynCall_iiiiiij;
        function assignWasmExports(wasmExports2) {
          Module2["_sqlite3_status64"] = _sqlite3_status64 = wasmExports2["ra"];
          Module2["_sqlite3_status"] = _sqlite3_status = wasmExports2["sa"];
          Module2["_sqlite3_db_status"] = _sqlite3_db_status = wasmExports2["ta"];
          Module2["_sqlite3_msize"] = _sqlite3_msize = wasmExports2["ua"];
          Module2["_sqlite3_vfs_find"] = _sqlite3_vfs_find = wasmExports2["va"];
          Module2["_sqlite3_vfs_register"] = _sqlite3_vfs_register = wasmExports2["wa"];
          Module2["_sqlite3_vfs_unregister"] = _sqlite3_vfs_unregister = wasmExports2["xa"];
          Module2["_sqlite3_release_memory"] = _sqlite3_release_memory = wasmExports2["ya"];
          Module2["_sqlite3_soft_heap_limit64"] = _sqlite3_soft_heap_limit64 = wasmExports2["za"];
          Module2["_sqlite3_memory_used"] = _sqlite3_memory_used = wasmExports2["Aa"];
          Module2["_sqlite3_hard_heap_limit64"] = _sqlite3_hard_heap_limit64 = wasmExports2["Ba"];
          Module2["_sqlite3_memory_highwater"] = _sqlite3_memory_highwater = wasmExports2["Ca"];
          Module2["_sqlite3_malloc"] = _sqlite3_malloc = wasmExports2["Da"];
          Module2["_sqlite3_malloc64"] = _sqlite3_malloc64 = wasmExports2["Ea"];
          Module2["_sqlite3_free"] = _sqlite3_free = wasmExports2["Fa"];
          Module2["_sqlite3_realloc"] = _sqlite3_realloc = wasmExports2["Ga"];
          Module2["_sqlite3_realloc64"] = _sqlite3_realloc64 = wasmExports2["Ha"];
          Module2["_sqlite3_str_vappendf"] = _sqlite3_str_vappendf = wasmExports2["Ia"];
          Module2["_sqlite3_str_append"] = _sqlite3_str_append = wasmExports2["Ja"];
          Module2["_sqlite3_str_appendchar"] = _sqlite3_str_appendchar = wasmExports2["Ka"];
          Module2["_sqlite3_str_appendall"] = _sqlite3_str_appendall = wasmExports2["La"];
          Module2["_sqlite3_str_appendf"] = _sqlite3_str_appendf = wasmExports2["Ma"];
          Module2["_sqlite3_str_finish"] = _sqlite3_str_finish = wasmExports2["Na"];
          Module2["_sqlite3_str_errcode"] = _sqlite3_str_errcode = wasmExports2["Oa"];
          Module2["_sqlite3_str_length"] = _sqlite3_str_length = wasmExports2["Pa"];
          Module2["_sqlite3_str_value"] = _sqlite3_str_value = wasmExports2["Qa"];
          Module2["_sqlite3_str_reset"] = _sqlite3_str_reset = wasmExports2["Ra"];
          Module2["_sqlite3_str_new"] = _sqlite3_str_new = wasmExports2["Sa"];
          Module2["_sqlite3_vmprintf"] = _sqlite3_vmprintf = wasmExports2["Ta"];
          Module2["_sqlite3_mprintf"] = _sqlite3_mprintf = wasmExports2["Ua"];
          Module2["_sqlite3_vsnprintf"] = _sqlite3_vsnprintf = wasmExports2["Va"];
          Module2["_sqlite3_snprintf"] = _sqlite3_snprintf = wasmExports2["Wa"];
          Module2["_sqlite3_log"] = _sqlite3_log = wasmExports2["Xa"];
          Module2["_sqlite3_randomness"] = _sqlite3_randomness = wasmExports2["Ya"];
          Module2["_sqlite3_stricmp"] = _sqlite3_stricmp = wasmExports2["Za"];
          Module2["_sqlite3_strnicmp"] = _sqlite3_strnicmp = wasmExports2["_a"];
          Module2["_sqlite3_os_init"] = _sqlite3_os_init = wasmExports2["$a"];
          Module2["_sqlite3_os_end"] = _sqlite3_os_end = wasmExports2["ab"];
          Module2["_sqlite3_serialize"] = _sqlite3_serialize = wasmExports2["bb"];
          Module2["_sqlite3_prepare_v2"] = _sqlite3_prepare_v2 = wasmExports2["cb"];
          Module2["_sqlite3_step"] = _sqlite3_step = wasmExports2["db"];
          Module2["_sqlite3_column_int64"] = _sqlite3_column_int64 = wasmExports2["eb"];
          Module2["_sqlite3_reset"] = _sqlite3_reset = wasmExports2["fb"];
          Module2["_sqlite3_exec"] = _sqlite3_exec = wasmExports2["gb"];
          Module2["_sqlite3_column_int"] = _sqlite3_column_int = wasmExports2["hb"];
          Module2["_sqlite3_finalize"] = _sqlite3_finalize = wasmExports2["ib"];
          Module2["_sqlite3_deserialize"] = _sqlite3_deserialize = wasmExports2["jb"];
          Module2["_sqlite3_database_file_object"] = _sqlite3_database_file_object = wasmExports2["kb"];
          Module2["_sqlite3_backup_init"] = _sqlite3_backup_init = wasmExports2["lb"];
          Module2["_sqlite3_backup_step"] = _sqlite3_backup_step = wasmExports2["mb"];
          Module2["_sqlite3_backup_finish"] = _sqlite3_backup_finish = wasmExports2["nb"];
          Module2["_sqlite3_backup_remaining"] = _sqlite3_backup_remaining = wasmExports2["ob"];
          Module2["_sqlite3_backup_pagecount"] = _sqlite3_backup_pagecount = wasmExports2["pb"];
          Module2["_sqlite3_clear_bindings"] = _sqlite3_clear_bindings = wasmExports2["qb"];
          Module2["_sqlite3_value_blob"] = _sqlite3_value_blob = wasmExports2["rb"];
          Module2["_sqlite3_value_text"] = _sqlite3_value_text = wasmExports2["sb"];
          Module2["_sqlite3_value_bytes"] = _sqlite3_value_bytes = wasmExports2["tb"];
          Module2["_sqlite3_value_bytes16"] = _sqlite3_value_bytes16 = wasmExports2["ub"];
          Module2["_sqlite3_value_double"] = _sqlite3_value_double = wasmExports2["vb"];
          Module2["_sqlite3_value_int"] = _sqlite3_value_int = wasmExports2["wb"];
          Module2["_sqlite3_value_int64"] = _sqlite3_value_int64 = wasmExports2["xb"];
          Module2["_sqlite3_value_subtype"] = _sqlite3_value_subtype = wasmExports2["yb"];
          Module2["_sqlite3_value_pointer"] = _sqlite3_value_pointer = wasmExports2["zb"];
          Module2["_sqlite3_value_text16"] = _sqlite3_value_text16 = wasmExports2["Ab"];
          Module2["_sqlite3_value_text16be"] = _sqlite3_value_text16be = wasmExports2["Bb"];
          Module2["_sqlite3_value_text16le"] = _sqlite3_value_text16le = wasmExports2["Cb"];
          Module2["_sqlite3_value_type"] = _sqlite3_value_type = wasmExports2["Db"];
          Module2["_sqlite3_value_encoding"] = _sqlite3_value_encoding = wasmExports2["Eb"];
          Module2["_sqlite3_value_nochange"] = _sqlite3_value_nochange = wasmExports2["Fb"];
          Module2["_sqlite3_value_frombind"] = _sqlite3_value_frombind = wasmExports2["Gb"];
          Module2["_sqlite3_value_dup"] = _sqlite3_value_dup = wasmExports2["Hb"];
          Module2["_sqlite3_value_free"] = _sqlite3_value_free = wasmExports2["Ib"];
          Module2["_sqlite3_result_blob"] = _sqlite3_result_blob = wasmExports2["Jb"];
          Module2["_sqlite3_result_blob64"] = _sqlite3_result_blob64 = wasmExports2["Kb"];
          Module2["_sqlite3_result_double"] = _sqlite3_result_double = wasmExports2["Lb"];
          Module2["_sqlite3_result_error"] = _sqlite3_result_error = wasmExports2["Mb"];
          Module2["_sqlite3_result_error16"] = _sqlite3_result_error16 = wasmExports2["Nb"];
          Module2["_sqlite3_result_int"] = _sqlite3_result_int = wasmExports2["Ob"];
          Module2["_sqlite3_result_int64"] = _sqlite3_result_int64 = wasmExports2["Pb"];
          Module2["_sqlite3_result_null"] = _sqlite3_result_null = wasmExports2["Qb"];
          Module2["_sqlite3_result_pointer"] = _sqlite3_result_pointer = wasmExports2["Rb"];
          Module2["_sqlite3_result_subtype"] = _sqlite3_result_subtype = wasmExports2["Sb"];
          Module2["_sqlite3_result_text"] = _sqlite3_result_text = wasmExports2["Tb"];
          Module2["_sqlite3_result_text64"] = _sqlite3_result_text64 = wasmExports2["Ub"];
          Module2["_sqlite3_result_text16"] = _sqlite3_result_text16 = wasmExports2["Vb"];
          Module2["_sqlite3_result_text16be"] = _sqlite3_result_text16be = wasmExports2["Wb"];
          Module2["_sqlite3_result_text16le"] = _sqlite3_result_text16le = wasmExports2["Xb"];
          Module2["_sqlite3_result_value"] = _sqlite3_result_value = wasmExports2["Yb"];
          Module2["_sqlite3_result_error_toobig"] = _sqlite3_result_error_toobig = wasmExports2["Zb"];
          Module2["_sqlite3_result_zeroblob"] = _sqlite3_result_zeroblob = wasmExports2["_b"];
          Module2["_sqlite3_result_zeroblob64"] = _sqlite3_result_zeroblob64 = wasmExports2["$b"];
          Module2["_sqlite3_result_error_code"] = _sqlite3_result_error_code = wasmExports2["ac"];
          Module2["_sqlite3_result_error_nomem"] = _sqlite3_result_error_nomem = wasmExports2["bc"];
          Module2["_sqlite3_user_data"] = _sqlite3_user_data = wasmExports2["cc"];
          Module2["_sqlite3_context_db_handle"] = _sqlite3_context_db_handle = wasmExports2["dc"];
          Module2["_sqlite3_vtab_nochange"] = _sqlite3_vtab_nochange = wasmExports2["ec"];
          Module2["_sqlite3_vtab_in_first"] = _sqlite3_vtab_in_first = wasmExports2["fc"];
          Module2["_sqlite3_vtab_in_next"] = _sqlite3_vtab_in_next = wasmExports2["gc"];
          Module2["_sqlite3_aggregate_context"] = _sqlite3_aggregate_context = wasmExports2["hc"];
          Module2["_sqlite3_get_auxdata"] = _sqlite3_get_auxdata = wasmExports2["ic"];
          Module2["_sqlite3_set_auxdata"] = _sqlite3_set_auxdata = wasmExports2["jc"];
          Module2["_sqlite3_column_count"] = _sqlite3_column_count = wasmExports2["kc"];
          Module2["_sqlite3_data_count"] = _sqlite3_data_count = wasmExports2["lc"];
          Module2["_sqlite3_column_blob"] = _sqlite3_column_blob = wasmExports2["mc"];
          Module2["_sqlite3_column_bytes"] = _sqlite3_column_bytes = wasmExports2["nc"];
          Module2["_sqlite3_column_bytes16"] = _sqlite3_column_bytes16 = wasmExports2["oc"];
          Module2["_sqlite3_column_double"] = _sqlite3_column_double = wasmExports2["pc"];
          Module2["_sqlite3_column_text"] = _sqlite3_column_text = wasmExports2["qc"];
          Module2["_sqlite3_column_value"] = _sqlite3_column_value = wasmExports2["rc"];
          Module2["_sqlite3_column_text16"] = _sqlite3_column_text16 = wasmExports2["sc"];
          Module2["_sqlite3_column_type"] = _sqlite3_column_type = wasmExports2["tc"];
          Module2["_sqlite3_column_name"] = _sqlite3_column_name = wasmExports2["uc"];
          Module2["_sqlite3_column_name16"] = _sqlite3_column_name16 = wasmExports2["vc"];
          Module2["_sqlite3_bind_blob"] = _sqlite3_bind_blob = wasmExports2["wc"];
          Module2["_sqlite3_bind_blob64"] = _sqlite3_bind_blob64 = wasmExports2["xc"];
          Module2["_sqlite3_bind_double"] = _sqlite3_bind_double = wasmExports2["yc"];
          Module2["_sqlite3_bind_int"] = _sqlite3_bind_int = wasmExports2["zc"];
          Module2["_sqlite3_bind_int64"] = _sqlite3_bind_int64 = wasmExports2["Ac"];
          Module2["_sqlite3_bind_null"] = _sqlite3_bind_null = wasmExports2["Bc"];
          Module2["_sqlite3_bind_pointer"] = _sqlite3_bind_pointer = wasmExports2["Cc"];
          Module2["_sqlite3_bind_text"] = _sqlite3_bind_text = wasmExports2["Dc"];
          Module2["_sqlite3_bind_text64"] = _sqlite3_bind_text64 = wasmExports2["Ec"];
          Module2["_sqlite3_bind_text16"] = _sqlite3_bind_text16 = wasmExports2["Fc"];
          Module2["_sqlite3_bind_value"] = _sqlite3_bind_value = wasmExports2["Gc"];
          Module2["_sqlite3_bind_zeroblob"] = _sqlite3_bind_zeroblob = wasmExports2["Hc"];
          Module2["_sqlite3_bind_zeroblob64"] = _sqlite3_bind_zeroblob64 = wasmExports2["Ic"];
          Module2["_sqlite3_bind_parameter_count"] = _sqlite3_bind_parameter_count = wasmExports2["Jc"];
          Module2["_sqlite3_bind_parameter_name"] = _sqlite3_bind_parameter_name = wasmExports2["Kc"];
          Module2["_sqlite3_bind_parameter_index"] = _sqlite3_bind_parameter_index = wasmExports2["Lc"];
          Module2["_sqlite3_db_handle"] = _sqlite3_db_handle = wasmExports2["Mc"];
          Module2["_sqlite3_stmt_readonly"] = _sqlite3_stmt_readonly = wasmExports2["Nc"];
          Module2["_sqlite3_stmt_isexplain"] = _sqlite3_stmt_isexplain = wasmExports2["Oc"];
          Module2["_sqlite3_stmt_explain"] = _sqlite3_stmt_explain = wasmExports2["Pc"];
          Module2["_sqlite3_stmt_busy"] = _sqlite3_stmt_busy = wasmExports2["Qc"];
          Module2["_sqlite3_next_stmt"] = _sqlite3_next_stmt = wasmExports2["Rc"];
          Module2["_sqlite3_stmt_status"] = _sqlite3_stmt_status = wasmExports2["Sc"];
          Module2["_sqlite3_sql"] = _sqlite3_sql = wasmExports2["Tc"];
          Module2["_sqlite3_expanded_sql"] = _sqlite3_expanded_sql = wasmExports2["Uc"];
          Module2["_sqlite3_value_numeric_type"] = _sqlite3_value_numeric_type = wasmExports2["Vc"];
          Module2["_sqlite3_blob_open"] = _sqlite3_blob_open = wasmExports2["Wc"];
          Module2["_sqlite3_blob_close"] = _sqlite3_blob_close = wasmExports2["Xc"];
          Module2["_sqlite3_blob_read"] = _sqlite3_blob_read = wasmExports2["Yc"];
          Module2["_sqlite3_blob_write"] = _sqlite3_blob_write = wasmExports2["Zc"];
          Module2["_sqlite3_blob_bytes"] = _sqlite3_blob_bytes = wasmExports2["_c"];
          Module2["_sqlite3_blob_reopen"] = _sqlite3_blob_reopen = wasmExports2["$c"];
          Module2["_sqlite3_set_authorizer"] = _sqlite3_set_authorizer = wasmExports2["ad"];
          Module2["_sqlite3_strglob"] = _sqlite3_strglob = wasmExports2["bd"];
          Module2["_sqlite3_strlike"] = _sqlite3_strlike = wasmExports2["cd"];
          Module2["_sqlite3_errmsg"] = _sqlite3_errmsg = wasmExports2["dd"];
          Module2["_sqlite3_auto_extension"] = _sqlite3_auto_extension = wasmExports2["ed"];
          Module2["_sqlite3_cancel_auto_extension"] = _sqlite3_cancel_auto_extension = wasmExports2["fd"];
          Module2["_sqlite3_reset_auto_extension"] = _sqlite3_reset_auto_extension = wasmExports2["gd"];
          Module2["_sqlite3_prepare"] = _sqlite3_prepare = wasmExports2["hd"];
          Module2["_sqlite3_prepare_v3"] = _sqlite3_prepare_v3 = wasmExports2["id"];
          Module2["_sqlite3_prepare16"] = _sqlite3_prepare16 = wasmExports2["jd"];
          Module2["_sqlite3_prepare16_v2"] = _sqlite3_prepare16_v2 = wasmExports2["kd"];
          Module2["_sqlite3_prepare16_v3"] = _sqlite3_prepare16_v3 = wasmExports2["ld"];
          Module2["_sqlite3_get_table"] = _sqlite3_get_table = wasmExports2["md"];
          Module2["_sqlite3_free_table"] = _sqlite3_free_table = wasmExports2["nd"];
          Module2["_sqlite3_create_module"] = _sqlite3_create_module = wasmExports2["od"];
          Module2["_sqlite3_create_module_v2"] = _sqlite3_create_module_v2 = wasmExports2["pd"];
          Module2["_sqlite3_drop_modules"] = _sqlite3_drop_modules = wasmExports2["qd"];
          Module2["_sqlite3_declare_vtab"] = _sqlite3_declare_vtab = wasmExports2["rd"];
          Module2["_sqlite3_vtab_on_conflict"] = _sqlite3_vtab_on_conflict = wasmExports2["sd"];
          Module2["_sqlite3_vtab_config"] = _sqlite3_vtab_config = wasmExports2["td"];
          Module2["_sqlite3_vtab_collation"] = _sqlite3_vtab_collation = wasmExports2["ud"];
          Module2["_sqlite3_vtab_in"] = _sqlite3_vtab_in = wasmExports2["vd"];
          Module2["_sqlite3_vtab_rhs_value"] = _sqlite3_vtab_rhs_value = wasmExports2["wd"];
          Module2["_sqlite3_vtab_distinct"] = _sqlite3_vtab_distinct = wasmExports2["xd"];
          Module2["_sqlite3_keyword_name"] = _sqlite3_keyword_name = wasmExports2["yd"];
          Module2["_sqlite3_keyword_count"] = _sqlite3_keyword_count = wasmExports2["zd"];
          Module2["_sqlite3_keyword_check"] = _sqlite3_keyword_check = wasmExports2["Ad"];
          Module2["_sqlite3_complete"] = _sqlite3_complete = wasmExports2["Bd"];
          Module2["_sqlite3_complete16"] = _sqlite3_complete16 = wasmExports2["Cd"];
          Module2["_sqlite3_libversion"] = _sqlite3_libversion = wasmExports2["Dd"];
          Module2["_sqlite3_libversion_number"] = _sqlite3_libversion_number = wasmExports2["Ed"];
          Module2["_sqlite3_threadsafe"] = _sqlite3_threadsafe = wasmExports2["Fd"];
          Module2["_sqlite3_initialize"] = _sqlite3_initialize = wasmExports2["Gd"];
          Module2["_sqlite3_shutdown"] = _sqlite3_shutdown = wasmExports2["Hd"];
          Module2["_sqlite3_config"] = _sqlite3_config = wasmExports2["Id"];
          Module2["_sqlite3_db_mutex"] = _sqlite3_db_mutex = wasmExports2["Jd"];
          Module2["_sqlite3_db_release_memory"] = _sqlite3_db_release_memory = wasmExports2["Kd"];
          Module2["_sqlite3_db_cacheflush"] = _sqlite3_db_cacheflush = wasmExports2["Ld"];
          Module2["_sqlite3_db_config"] = _sqlite3_db_config = wasmExports2["Md"];
          Module2["_sqlite3_last_insert_rowid"] = _sqlite3_last_insert_rowid = wasmExports2["Nd"];
          Module2["_sqlite3_set_last_insert_rowid"] = _sqlite3_set_last_insert_rowid = wasmExports2["Od"];
          Module2["_sqlite3_changes64"] = _sqlite3_changes64 = wasmExports2["Pd"];
          Module2["_sqlite3_changes"] = _sqlite3_changes = wasmExports2["Qd"];
          Module2["_sqlite3_total_changes64"] = _sqlite3_total_changes64 = wasmExports2["Rd"];
          Module2["_sqlite3_total_changes"] = _sqlite3_total_changes = wasmExports2["Sd"];
          Module2["_sqlite3_txn_state"] = _sqlite3_txn_state = wasmExports2["Td"];
          Module2["_sqlite3_close"] = _sqlite3_close = wasmExports2["Ud"];
          Module2["_sqlite3_close_v2"] = _sqlite3_close_v2 = wasmExports2["Vd"];
          Module2["_sqlite3_busy_handler"] = _sqlite3_busy_handler = wasmExports2["Wd"];
          Module2["_sqlite3_progress_handler"] = _sqlite3_progress_handler = wasmExports2["Xd"];
          Module2["_sqlite3_busy_timeout"] = _sqlite3_busy_timeout = wasmExports2["Yd"];
          Module2["_sqlite3_interrupt"] = _sqlite3_interrupt = wasmExports2["Zd"];
          Module2["_sqlite3_is_interrupted"] = _sqlite3_is_interrupted = wasmExports2["_d"];
          Module2["_sqlite3_create_function"] = _sqlite3_create_function = wasmExports2["$d"];
          Module2["_sqlite3_create_function_v2"] = _sqlite3_create_function_v2 = wasmExports2["ae"];
          Module2["_sqlite3_create_window_function"] = _sqlite3_create_window_function = wasmExports2["be"];
          Module2["_sqlite3_create_function16"] = _sqlite3_create_function16 = wasmExports2["ce"];
          Module2["_sqlite3_overload_function"] = _sqlite3_overload_function = wasmExports2["de"];
          Module2["_sqlite3_trace_v2"] = _sqlite3_trace_v2 = wasmExports2["ee"];
          Module2["_sqlite3_commit_hook"] = _sqlite3_commit_hook = wasmExports2["fe"];
          Module2["_sqlite3_update_hook"] = _sqlite3_update_hook = wasmExports2["ge"];
          Module2["_sqlite3_rollback_hook"] = _sqlite3_rollback_hook = wasmExports2["he"];
          Module2["_sqlite3_autovacuum_pages"] = _sqlite3_autovacuum_pages = wasmExports2["ie"];
          Module2["_sqlite3_wal_autocheckpoint"] = _sqlite3_wal_autocheckpoint = wasmExports2["je"];
          Module2["_sqlite3_wal_hook"] = _sqlite3_wal_hook = wasmExports2["ke"];
          Module2["_sqlite3_wal_checkpoint_v2"] = _sqlite3_wal_checkpoint_v2 = wasmExports2["le"];
          Module2["_sqlite3_wal_checkpoint"] = _sqlite3_wal_checkpoint = wasmExports2["me"];
          Module2["_sqlite3_error_offset"] = _sqlite3_error_offset = wasmExports2["ne"];
          Module2["_sqlite3_errmsg16"] = _sqlite3_errmsg16 = wasmExports2["oe"];
          Module2["_sqlite3_errcode"] = _sqlite3_errcode = wasmExports2["pe"];
          Module2["_sqlite3_extended_errcode"] = _sqlite3_extended_errcode = wasmExports2["qe"];
          Module2["_sqlite3_system_errno"] = _sqlite3_system_errno = wasmExports2["re"];
          Module2["_sqlite3_errstr"] = _sqlite3_errstr = wasmExports2["se"];
          Module2["_sqlite3_limit"] = _sqlite3_limit = wasmExports2["te"];
          Module2["_sqlite3_open"] = _sqlite3_open = wasmExports2["ue"];
          Module2["_sqlite3_open_v2"] = _sqlite3_open_v2 = wasmExports2["ve"];
          Module2["_sqlite3_open16"] = _sqlite3_open16 = wasmExports2["we"];
          Module2["_sqlite3_create_collation"] = _sqlite3_create_collation = wasmExports2["xe"];
          Module2["_sqlite3_create_collation_v2"] = _sqlite3_create_collation_v2 = wasmExports2["ye"];
          Module2["_sqlite3_create_collation16"] = _sqlite3_create_collation16 = wasmExports2["ze"];
          Module2["_sqlite3_collation_needed"] = _sqlite3_collation_needed = wasmExports2["Ae"];
          Module2["_sqlite3_collation_needed16"] = _sqlite3_collation_needed16 = wasmExports2["Be"];
          Module2["_sqlite3_get_clientdata"] = _sqlite3_get_clientdata = wasmExports2["Ce"];
          Module2["_sqlite3_set_clientdata"] = _sqlite3_set_clientdata = wasmExports2["De"];
          Module2["_sqlite3_get_autocommit"] = _sqlite3_get_autocommit = wasmExports2["Ee"];
          Module2["_sqlite3_table_column_metadata"] = _sqlite3_table_column_metadata = wasmExports2["Fe"];
          Module2["_sqlite3_sleep"] = _sqlite3_sleep = wasmExports2["Ge"];
          Module2["_sqlite3_extended_result_codes"] = _sqlite3_extended_result_codes = wasmExports2["He"];
          Module2["_sqlite3_file_control"] = _sqlite3_file_control = wasmExports2["Ie"];
          Module2["_sqlite3_test_control"] = _sqlite3_test_control = wasmExports2["Je"];
          Module2["_sqlite3_create_filename"] = _sqlite3_create_filename = wasmExports2["Ke"];
          Module2["_sqlite3_free_filename"] = _sqlite3_free_filename = wasmExports2["Le"];
          Module2["_sqlite3_uri_parameter"] = _sqlite3_uri_parameter = wasmExports2["Me"];
          Module2["_sqlite3_uri_key"] = _sqlite3_uri_key = wasmExports2["Ne"];
          Module2["_sqlite3_uri_boolean"] = _sqlite3_uri_boolean = wasmExports2["Oe"];
          Module2["_sqlite3_uri_int64"] = _sqlite3_uri_int64 = wasmExports2["Pe"];
          Module2["_sqlite3_filename_database"] = _sqlite3_filename_database = wasmExports2["Qe"];
          Module2["_sqlite3_filename_journal"] = _sqlite3_filename_journal = wasmExports2["Re"];
          Module2["_sqlite3_filename_wal"] = _sqlite3_filename_wal = wasmExports2["Se"];
          Module2["_sqlite3_db_name"] = _sqlite3_db_name = wasmExports2["Te"];
          Module2["_sqlite3_db_filename"] = _sqlite3_db_filename = wasmExports2["Ue"];
          Module2["_sqlite3_db_readonly"] = _sqlite3_db_readonly = wasmExports2["Ve"];
          Module2["_sqlite3_compileoption_used"] = _sqlite3_compileoption_used = wasmExports2["We"];
          Module2["_sqlite3_compileoption_get"] = _sqlite3_compileoption_get = wasmExports2["Xe"];
          Module2["_sqlite3session_create"] = _sqlite3session_create = wasmExports2["Ye"];
          Module2["_sqlite3session_delete"] = _sqlite3session_delete = wasmExports2["Ze"];
          Module2["_sqlite3session_attach"] = _sqlite3session_attach = wasmExports2["_e"];
          Module2["_sqlite3session_changeset"] = _sqlite3session_changeset = wasmExports2["$e"];
          Module2["_sqlite3session_enable"] = _sqlite3session_enable = wasmExports2["af"];
          Module2["_sqlite3changeset_invert"] = _sqlite3changeset_invert = wasmExports2["bf"];
          Module2["_sqlite3changeset_apply"] = _sqlite3changeset_apply = wasmExports2["cf"];
          Module2["_sqlite3_sourceid"] = _sqlite3_sourceid = wasmExports2["df"];
          Module2["_malloc"] = _malloc = wasmExports2["ef"];
          Module2["_free"] = _free = wasmExports2["ff"];
          Module2["_RegisterExtensionFunctions"] = _RegisterExtensionFunctions = wasmExports2["gf"];
          Module2["_getSqliteFree"] = _getSqliteFree = wasmExports2["hf"];
          Module2["_main"] = _main = wasmExports2["jf"];
          Module2["_libauthorizer_set_authorizer"] = _libauthorizer_set_authorizer = wasmExports2["kf"];
          Module2["_libfunction_create_function"] = _libfunction_create_function = wasmExports2["lf"];
          Module2["_libhook_commit_hook"] = _libhook_commit_hook = wasmExports2["mf"];
          Module2["_libhook_update_hook"] = _libhook_update_hook = wasmExports2["nf"];
          Module2["_libprogress_progress_handler"] = _libprogress_progress_handler = wasmExports2["of"];
          Module2["_libvfs_vfs_register"] = _libvfs_vfs_register = wasmExports2["pf"];
          _emscripten_builtin_memalign = wasmExports2["rf"];
          __emscripten_timeout = wasmExports2["sf"];
          __emscripten_tempret_get = wasmExports2["tf"];
          __emscripten_stack_restore = wasmExports2["uf"];
          __emscripten_stack_alloc = wasmExports2["vf"];
          _emscripten_stack_get_current = wasmExports2["wf"];
          dynCall_viiiiijj = wasmExports2["dynCall_viiiiijj"];
          dynCall_viji = wasmExports2["dynCall_viji"];
          dynCall_viiiij = wasmExports2["dynCall_viiiij"];
          dynCall_iij = wasmExports2["dynCall_iij"];
          dynCall_iiiij = wasmExports2["dynCall_iiiij"];
          dynCall_iijii = wasmExports2["dynCall_iijii"];
          dynCall_iiji = wasmExports2["dynCall_iiji"];
          dynCall_iiiiiij = wasmExports2["dynCall_iiiiiij"];
        }
        var _sqlite3_version = Module2["_sqlite3_version"] = 5472;
        var wasmImports = { a: ___assert_fail, aa: ___syscall_chmod, da: ___syscall_faccessat, ba: ___syscall_fchmod, $: ___syscall_fchown32, b: ___syscall_fcntl64, _: ___syscall_fstat64, y: ___syscall_ftruncate64, U: ___syscall_getcwd, Y: ___syscall_lstat64, R: ___syscall_mkdirat, X: ___syscall_newfstatat, P: ___syscall_openat, N: ___syscall_readlinkat, M: ___syscall_rmdir, Z: ___syscall_stat64, K: ___syscall_unlinkat, J: ___syscall_utimensat, F: __abort_js, E: __emscripten_runtime_keepalive_clear, w: __localtime_js, u: __mmap_js, v: __munmap_js, G: __setitimer_js, Q: __tzset_js, n: _emscripten_date_now, g: _emscripten_get_now, H: _emscripten_resize_heap, S: _environ_get, T: _environ_sizes_get, o: _fd_close, I: _fd_fdstat_get, O: _fd_read, x: _fd_seek, V: _fd_sync, L: _fd_write, s: _ipp, t: _ipp_async, ka: _ippipppp, oa: _ippipppp_async, j: _ippp, k: _ippp_async, c: _ipppi, d: _ipppi_async, ga: _ipppiii, ha: _ipppiii_async, ia: _ipppiiip, ja: _ipppiiip_async, h: _ipppip, i: _ipppip_async, z: _ipppj, A: _ipppj_async, e: _ipppp, f: _ipppp_async, ea: _ippppi, fa: _ippppi_async, B: _ippppij, C: _ippppij_async, p: _ippppip, q: _ippppip_async, la: _ipppppip, ma: _ipppppip_async, D: _proc_exit, na: _vppippii, r: _vppippii_async, l: _vppp, m: _vppp_async, W: _vpppip, ca: _vpppip_async };
        var wasmExports = await createWasm();
        function callMain() {
          var entryFunction = _main;
          var argc = 0;
          var argv = 0;
          try {
            var ret = entryFunction(argc, argv);
            exitJS(ret, true);
            return ret;
          } catch (e) {
            return handleException(e);
          }
        }
        function run2() {
          if (runDependencies > 0) {
            dependenciesFulfilled = run2;
            return;
          }
          preRun();
          if (runDependencies > 0) {
            dependenciesFulfilled = run2;
            return;
          }
          function doRun() {
            Module2["calledRun"] = true;
            if (ABORT) return;
            initRuntime();
            preMain();
            readyPromiseResolve?.(Module2);
            Module2["onRuntimeInitialized"]?.();
            var noInitialRun = Module2["noInitialRun"] || false;
            if (!noInitialRun) callMain();
            postRun();
          }
          if (Module2["setStatus"]) {
            Module2["setStatus"]("Running...");
            setTimeout(() => {
              setTimeout(() => Module2["setStatus"](""), 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }
        function preInit() {
          if (Module2["preInit"]) {
            if (typeof Module2["preInit"] == "function") Module2["preInit"] = [Module2["preInit"]];
            while (Module2["preInit"].length > 0) {
              Module2["preInit"].shift()();
            }
          }
        }
        preInit();
        run2();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          let pAsyncFlags = 0;
          Module2["set_authorizer"] = function(db, xAuthorizer, pApp) {
            if (pAsyncFlags) {
              Module2["deleteCallback"](pAsyncFlags);
              Module2["_sqlite3_free"](pAsyncFlags);
              pAsyncFlags = 0;
            }
            pAsyncFlags = Module2["_sqlite3_malloc"](4);
            setValue(pAsyncFlags, xAuthorizer instanceof AsyncFunction3 ? 1 : 0, "i32");
            const result = ccall("libauthorizer_set_authorizer", "number", ["number", "number", "number"], [db, xAuthorizer ? 1 : 0, pAsyncFlags]);
            if (!result && xAuthorizer) {
              Module2["setCallback"](pAsyncFlags, (_, iAction, p3, p4, p5, p6) => xAuthorizer(pApp, iAction, p3, p4, p5, p6));
            }
            return result;
          };
        })();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          const FUNC_METHODS = ["xFunc", "xStep", "xFinal"];
          const mapFunctionNameToKey = /* @__PURE__ */ new Map();
          Module2["create_function"] = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
            const pAsyncFlags = Module2["_sqlite3_malloc"](4);
            const target = { xFunc, xStep, xFinal };
            setValue(pAsyncFlags, FUNC_METHODS.reduce((mask, method, i) => {
              if (target[method] instanceof AsyncFunction3) {
                return mask | 1 << i;
              }
              return mask;
            }, 0), "i32");
            const result = ccall("libfunction_create_function", "number", ["number", "string", "number", "number", "number", "number", "number", "number"], [db, zFunctionName, nArg, eTextRep, pAsyncFlags, xFunc ? 1 : 0, xStep ? 1 : 0, xFinal ? 1 : 0]);
            if (!result) {
              if (mapFunctionNameToKey.has(zFunctionName)) {
                const oldKey = mapFunctionNameToKey.get(zFunctionName);
                Module2["deleteCallback"](oldKey);
              }
              mapFunctionNameToKey.set(zFunctionName, pAsyncFlags);
              Module2["setCallback"](pAsyncFlags, { xFunc, xStep, xFinal });
            }
            return result;
          };
        })();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          let pAsyncFlags = 0;
          Module2["update_hook"] = function(db, xUpdateHook) {
            if (pAsyncFlags) {
              Module2["deleteCallback"](pAsyncFlags);
              Module2["_sqlite3_free"](pAsyncFlags);
              pAsyncFlags = 0;
            }
            pAsyncFlags = Module2["_sqlite3_malloc"](4);
            setValue(pAsyncFlags, xUpdateHook instanceof AsyncFunction3 ? 1 : 0, "i32");
            ccall("libhook_update_hook", "void", ["number", "number", "number"], [db, xUpdateHook ? 1 : 0, pAsyncFlags]);
            if (xUpdateHook) {
              Module2["setCallback"](pAsyncFlags, (_, iUpdateType, dbName, tblName, lo32, hi32) => xUpdateHook(iUpdateType, dbName, tblName, lo32, hi32));
            }
          };
        })();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          let pAsyncFlags = 0;
          Module2["commit_hook"] = function(db, xCommitHook) {
            if (pAsyncFlags) {
              Module2["deleteCallback"](pAsyncFlags);
              Module2["_sqlite3_free"](pAsyncFlags);
              pAsyncFlags = 0;
            }
            pAsyncFlags = Module2["_sqlite3_malloc"](4);
            setValue(pAsyncFlags, xCommitHook instanceof AsyncFunction3 ? 1 : 0, "i32");
            ccall("libhook_commit_hook", "void", ["number", "number", "number"], [db, xCommitHook ? 1 : 0, pAsyncFlags]);
            if (xCommitHook) {
              Module2["setCallback"](pAsyncFlags, (_) => xCommitHook());
            }
          };
        })();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          let pAsyncFlags = 0;
          Module2["progress_handler"] = function(db, nOps, xProgress, pApp) {
            if (pAsyncFlags) {
              Module2["deleteCallback"](pAsyncFlags);
              Module2["_sqlite3_free"](pAsyncFlags);
              pAsyncFlags = 0;
            }
            pAsyncFlags = Module2["_sqlite3_malloc"](4);
            setValue(pAsyncFlags, xProgress instanceof AsyncFunction3 ? 1 : 0, "i32");
            ccall("libprogress_progress_handler", "number", ["number", "number", "number", "number"], [db, nOps, xProgress ? 1 : 0, pAsyncFlags]);
            if (xProgress) {
              Module2["setCallback"](pAsyncFlags, (_) => xProgress(pApp));
            }
          };
        })();
        (function() {
          const VFS_METHODS = ["xOpen", "xDelete", "xAccess", "xFullPathname", "xRandomness", "xSleep", "xCurrentTime", "xGetLastError", "xCurrentTimeInt64", "xClose", "xRead", "xWrite", "xTruncate", "xSync", "xFileSize", "xLock", "xUnlock", "xCheckReservedLock", "xFileControl", "xSectorSize", "xDeviceCharacteristics", "xShmMap", "xShmLock", "xShmBarrier", "xShmUnmap"];
          const mapVFSNameToKey = /* @__PURE__ */ new Map();
          Module2["vfs_register"] = function(vfs, makeDefault) {
            let methodMask = 0;
            let asyncMask = 0;
            VFS_METHODS.forEach((method, i) => {
              if (vfs[method]) {
                methodMask |= 1 << i;
                if (vfs["hasAsyncMethod"](method)) {
                  asyncMask |= 1 << i;
                }
              }
            });
            const vfsReturn = Module2["_sqlite3_malloc"](4);
            try {
              const result = ccall("libvfs_vfs_register", "number", ["string", "number", "number", "number", "number", "number"], [vfs.name, vfs.mxPathname, methodMask, asyncMask, makeDefault ? 1 : 0, vfsReturn]);
              if (!result) {
                if (mapVFSNameToKey.has(vfs.name)) {
                  const oldKey = mapVFSNameToKey.get(vfs.name);
                  Module2["deleteCallback"](oldKey);
                }
                const key = getValue(vfsReturn, "*");
                mapVFSNameToKey.set(vfs.name, key);
                Module2["setCallback"](key, vfs);
              }
              return result;
            } finally {
              Module2["_sqlite3_free"](vfsReturn);
            }
          };
        })();
        if (runtimeInitialized) {
          moduleRtn = Module2;
        } else {
          moduleRtn = new Promise((resolve, reject) => {
            readyPromiseResolve = resolve;
            readyPromiseReject = reject;
          });
        }
        return moduleRtn;
      });
    })();
    if (typeof exports === "object" && typeof module === "object") {
      module.exports = Module;
      module.exports.default = Module;
    } else if (typeof define === "function" && define["amd"])
      define([], () => Module);
  }
});

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/SQLAction.ts
function createSQLAction(value) {
  switch (value) {
    case 9:
      return "delete";
    case 18:
      return "insert";
    case 23:
      return "update";
    default:
      return "unknown";
  }
}

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/SQLiteOptions.ts
var SQLiteOptions = class {
  enableChangeListener = false;
  useNewConnection = false;
  finalizeUnusedStatementsBeforeClosing = true;
  constructor(optionsObject) {
    this.enableChangeListener = optionsObject.enableChangeListener ?? false;
    this.useNewConnection = optionsObject.useNewConnection ?? false;
    this.finalizeUnusedStatementsBeforeClosing = optionsObject.finalizeUnusedStatementsBeforeClosing ?? true;
  }
  equals(other) {
    return this.enableChangeListener === other.enableChangeListener && this.finalizeUnusedStatementsBeforeClosing === other.finalizeUnusedStatementsBeforeClosing && this.useNewConnection === other.useNewConnection;
  }
  toString() {
    return JSON.stringify({
      enableChangeListener: this.enableChangeListener,
      finalizeUnusedStatementsBeforeClosing: this.finalizeUnusedStatementsBeforeClosing,
      useNewConnection: this.useNewConnection
    });
  }
};

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/SyncSerializer.ts
var UINT8ARRAY_TYPE = "__uint8array__";
function serialize(value) {
  return JSON.stringify(value, (_, v) => {
    if (v instanceof Uint8Array) {
      return {
        [UINT8ARRAY_TYPE]: true,
        data: Array.from(v)
      };
    }
    return v;
  });
}

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/WorkerChannel.ts
var RESOLVED = 2;
function sendWorkerResult({
  id,
  result,
  error,
  syncTrait
}) {
  if (syncTrait) {
    const { lockBuffer, resultBuffer } = syncTrait;
    const lock = new Int32Array(lockBuffer);
    const resultArray = new Uint8Array(resultBuffer);
    const resultJson = error != null ? serialize({ error }) : serialize({ result });
    const resultBytes = new TextEncoder().encode(resultJson);
    const length = resultBytes.length;
    resultArray.set(new Uint32Array([length]), 0);
    resultArray.set(resultBytes, 4);
    Atomics.store(lock, 0, RESOLVED);
  } else {
    if (result) {
      self.postMessage({ id, result });
    } else {
      self.postMessage({ id, error });
    }
  }
}

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/sqlite-constants.js
var SQLITE_OK = 0;
var SQLITE_ERROR = 1;
var SQLITE_IOERR = 10;
var SQLITE_NOTFOUND = 12;
var SQLITE_CANTOPEN = 14;
var SQLITE_MISUSE = 21;
var SQLITE_RANGE = 25;
var SQLITE_NOTICE = 27;
var SQLITE_ROW = 100;
var SQLITE_DONE = 101;
var SQLITE_IOERR_SHORT_READ = 522;
var SQLITE_IOERR_WRITE = 778;
var SQLITE_OPEN_READWRITE = 2;
var SQLITE_OPEN_CREATE = 4;
var SQLITE_OPEN_DELETEONCLOSE = 8;
var SQLITE_OPEN_URI = 64;
var SQLITE_OPEN_MAIN_DB = 256;
var SQLITE_OPEN_TEMP_DB = 512;
var SQLITE_OPEN_TRANSIENT_DB = 1024;
var SQLITE_OPEN_MAIN_JOURNAL = 2048;
var SQLITE_OPEN_TEMP_JOURNAL = 4096;
var SQLITE_OPEN_SUBJOURNAL = 8192;
var SQLITE_OPEN_SUPER_JOURNAL = 16384;
var SQLITE_OPEN_WAL = 524288;
var SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 2048;
var SQLITE_INTEGER = 1;
var SQLITE_FLOAT = 2;
var SQLITE_TEXT = 3;
var SQLITE_BLOB = 4;
var SQLITE_NULL = 5;
var SQLITE_DESERIALIZE_FREEONCLOSE = 1;
var SQLITE_DESERIALIZE_RESIZEABLE = 2;
var SQLITE_CHANGESET_REPLACE = 1;

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/VFS.js
var DEFAULT_SECTOR_SIZE = 512;
var Base = class {
  name;
  mxPathname = 64;
  _module;
  /**
   * @param {string} name 
   * @param {object} module 
   */
  constructor(name, module) {
    this.name = name;
    this._module = module;
  }
  /**
   * @returns {void|Promise<void>} 
   */
  close() {
  }
  /**
   * @returns {boolean|Promise<boolean>}
   */
  isReady() {
    return true;
  }
  /**
   * Overload in subclasses to indicate which methods are asynchronous.
   * @param {string} methodName 
   * @returns {boolean}
   */
  hasAsyncMethod(methodName) {
    return false;
  }
  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} pFile 
   * @param {number} flags 
   * @param {number} pOutFlags 
   * @returns {number|Promise<number>}
   */
  xOpen(pVfs, zName, pFile, flags, pOutFlags) {
    return SQLITE_CANTOPEN;
  }
  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} syncDir 
   * @returns {number|Promise<number>}
   */
  xDelete(pVfs, zName, syncDir) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} flags 
   * @param {number} pResOut 
   * @returns {number|Promise<number>}
   */
  xAccess(pVfs, zName, flags, pResOut) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} nOut 
   * @param {number} zOut 
   * @returns {number|Promise<number>}
   */
  xFullPathname(pVfs, zName, nOut, zOut) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pVfs 
   * @param {number} nBuf 
   * @param {number} zBuf 
   * @returns {number|Promise<number>}
   */
  xGetLastError(pVfs, nBuf, zBuf) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xClose(pFile) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} pData 
   * @param {number} iAmt 
   * @param {number} iOffsetLo 
   * @param {number} iOffsetHi 
   * @returns {number|Promise<number>}
   */
  xRead(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} pData 
   * @param {number} iAmt 
   * @param {number} iOffsetLo 
   * @param {number} iOffsetHi 
   * @returns {number|Promise<number>}
   */
  xWrite(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} sizeLo 
   * @param {number} sizeHi 
   * @returns {number|Promise<number>}
   */
  xTruncate(pFile, sizeLo, sizeHi) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} flags 
   * @returns {number|Promise<number>}
   */
  xSync(pFile, flags) {
    return SQLITE_OK;
  }
  /**
   * 
   * @param {number} pFile 
   * @param {number} pSize 
   * @returns {number|Promise<number>}
   */
  xFileSize(pFile, pSize) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  xLock(pFile, lockType) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  xUnlock(pFile, lockType) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} pResOut 
   * @returns {number|Promise<number>}
   */
  xCheckReservedLock(pFile, pResOut) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} op 
   * @param {number} pArg 
   * @returns {number|Promise<number>}
   */
  xFileControl(pFile, op, pArg) {
    return SQLITE_NOTFOUND;
  }
  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xSectorSize(pFile) {
    return DEFAULT_SECTOR_SIZE;
  }
  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xDeviceCharacteristics(pFile) {
    return 0;
  }
};
var FILE_TYPE_MASK = [
  SQLITE_OPEN_MAIN_DB,
  SQLITE_OPEN_MAIN_JOURNAL,
  SQLITE_OPEN_TEMP_DB,
  SQLITE_OPEN_TEMP_JOURNAL,
  SQLITE_OPEN_TRANSIENT_DB,
  SQLITE_OPEN_SUBJOURNAL,
  SQLITE_OPEN_SUPER_JOURNAL,
  SQLITE_OPEN_WAL
].reduce((mask, element) => mask | element);

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/FacadeVFS.js
var AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
var FacadeVFS = class extends Base {
  /**
   * @param {string} name 
   * @param {object} module 
   */
  constructor(name, module) {
    super(name, module);
  }
  /**
   * Override to indicate which methods are asynchronous.
   * @param {string} methodName 
   * @returns {boolean}
   */
  hasAsyncMethod(methodName) {
    const jMethodName = `j${methodName.slice(1)}`;
    return this[jMethodName] instanceof AsyncFunction;
  }
  /**
   * Return the filename for a file id for use by mixins.
   * @param {number} pFile 
   * @returns {string}
   */
  getFilename(pFile) {
    throw new Error("unimplemented");
  }
  /**
   * @param {string?} filename 
   * @param {number} pFile 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number|Promise<number>}
   */
  jOpen(filename, pFile, flags, pOutFlags) {
    return SQLITE_CANTOPEN;
  }
  /**
   * @param {string} filename 
   * @param {number} syncDir 
   * @returns {number|Promise<number>}
   */
  jDelete(filename, syncDir) {
    return SQLITE_OK;
  }
  /**
   * @param {string} filename 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number|Promise<number>}
   */
  jAccess(filename, flags, pResOut) {
    return SQLITE_OK;
  }
  /**
   * @param {string} filename 
   * @param {Uint8Array} zOut 
   * @returns {number|Promise<number>}
   */
  jFullPathname(filename, zOut) {
    const { read, written } = new TextEncoder().encodeInto(filename, zOut);
    if (read < filename.length) return SQLITE_IOERR;
    if (written >= zOut.length) return SQLITE_IOERR;
    zOut[written] = 0;
    return SQLITE_OK;
  }
  /**
   * @param {Uint8Array} zBuf 
   * @returns {number|Promise<number>}
   */
  jGetLastError(zBuf) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  jClose(pFile) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {Uint8Array} pData 
   * @param {number} iOffset 
   * @returns {number|Promise<number>}
   */
  jRead(pFile, pData, iOffset) {
    pData.fill(0);
    return SQLITE_IOERR_SHORT_READ;
  }
  /**
   * @param {number} pFile 
   * @param {Uint8Array} pData 
   * @param {number} iOffset 
   * @returns {number|Promise<number>}
   */
  jWrite(pFile, pData, iOffset) {
    return SQLITE_IOERR_WRITE;
  }
  /**
   * @param {number} pFile 
   * @param {number} size 
   * @returns {number|Promise<number>}
   */
  jTruncate(pFile, size) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} flags 
   * @returns {number|Promise<number>}
   */
  jSync(pFile, flags) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {DataView} pSize
   * @returns {number|Promise<number>}
   */
  jFileSize(pFile, pSize) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  jLock(pFile, lockType) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  jUnlock(pFile, lockType) {
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile 
   * @param {DataView} pResOut 
   * @returns {number|Promise<number>}
   */
  jCheckReservedLock(pFile, pResOut) {
    pResOut.setInt32(0, 0, true);
    return SQLITE_OK;
  }
  /**
   * @param {number} pFile
   * @param {number} op
   * @param {DataView} pArg
   * @returns {number|Promise<number>}
   */
  jFileControl(pFile, op, pArg) {
    return SQLITE_NOTFOUND;
  }
  /**
   * @param {number} pFile
   * @returns {number|Promise<number>}
   */
  jSectorSize(pFile) {
    return super.xSectorSize(pFile);
  }
  /**
   * @param {number} pFile
   * @returns {number|Promise<number>}
   */
  jDeviceCharacteristics(pFile) {
    return 0;
  }
  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} pFile 
   * @param {number} flags 
   * @param {number} pOutFlags 
   * @returns {number|Promise<number>}
   */
  xOpen(pVfs, zName, pFile, flags, pOutFlags) {
    const filename = this.#decodeFilename(zName, flags);
    const pOutFlagsView = this.#makeTypedDataView("Int32", pOutFlags);
    this["log"]?.("jOpen", filename, pFile, "0x" + flags.toString(16));
    return this.jOpen(filename, pFile, flags, pOutFlagsView);
  }
  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} syncDir 
   * @returns {number|Promise<number>}
   */
  xDelete(pVfs, zName, syncDir) {
    const filename = this._module.UTF8ToString(zName);
    this["log"]?.("jDelete", filename, syncDir);
    return this.jDelete(filename, syncDir);
  }
  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} flags 
   * @param {number} pResOut 
   * @returns {number|Promise<number>}
   */
  xAccess(pVfs, zName, flags, pResOut) {
    const filename = this._module.UTF8ToString(zName);
    const pResOutView = this.#makeTypedDataView("Int32", pResOut);
    this["log"]?.("jAccess", filename, flags);
    return this.jAccess(filename, flags, pResOutView);
  }
  /**
   * @param {number} pVfs 
   * @param {number} zName 
   * @param {number} nOut 
   * @param {number} zOut 
   * @returns {number|Promise<number>}
   */
  xFullPathname(pVfs, zName, nOut, zOut) {
    const filename = this._module.UTF8ToString(zName);
    const zOutArray = this._module.HEAPU8.subarray(zOut, zOut + nOut);
    this["log"]?.("jFullPathname", filename, nOut);
    return this.jFullPathname(filename, zOutArray);
  }
  /**
   * @param {number} pVfs 
   * @param {number} nBuf 
   * @param {number} zBuf 
   * @returns {number|Promise<number>}
   */
  xGetLastError(pVfs, nBuf, zBuf) {
    const zBufArray = this._module.HEAPU8.subarray(zBuf, zBuf + nBuf);
    this["log"]?.("jGetLastError", nBuf);
    return this.jGetLastError(zBufArray);
  }
  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xClose(pFile) {
    this["log"]?.("jClose", pFile);
    return this.jClose(pFile);
  }
  /**
   * @param {number} pFile 
   * @param {number} pData 
   * @param {number} iAmt 
   * @param {number} iOffsetLo 
   * @param {number} iOffsetHi 
   * @returns {number|Promise<number>}
   */
  xRead(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
    const pDataArray = this.#makeDataArray(pData, iAmt);
    const iOffset = delegalize(iOffsetLo, iOffsetHi);
    this["log"]?.("jRead", pFile, iAmt, iOffset);
    return this.jRead(pFile, pDataArray, iOffset);
  }
  /**
   * @param {number} pFile 
   * @param {number} pData 
   * @param {number} iAmt 
   * @param {number} iOffsetLo 
   * @param {number} iOffsetHi 
   * @returns {number|Promise<number>}
   */
  xWrite(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
    const pDataArray = this.#makeDataArray(pData, iAmt);
    const iOffset = delegalize(iOffsetLo, iOffsetHi);
    this["log"]?.("jWrite", pFile, pDataArray, iOffset);
    return this.jWrite(pFile, pDataArray, iOffset);
  }
  /**
   * @param {number} pFile 
   * @param {number} sizeLo 
   * @param {number} sizeHi 
   * @returns {number|Promise<number>}
   */
  xTruncate(pFile, sizeLo, sizeHi) {
    const size = delegalize(sizeLo, sizeHi);
    this["log"]?.("jTruncate", pFile, size);
    return this.jTruncate(pFile, size);
  }
  /**
   * @param {number} pFile 
   * @param {number} flags 
   * @returns {number|Promise<number>}
   */
  xSync(pFile, flags) {
    this["log"]?.("jSync", pFile, flags);
    return this.jSync(pFile, flags);
  }
  /**
   * 
   * @param {number} pFile 
   * @param {number} pSize 
   * @returns {number|Promise<number>}
   */
  xFileSize(pFile, pSize) {
    const pSizeView = this.#makeTypedDataView("BigInt64", pSize);
    this["log"]?.("jFileSize", pFile);
    return this.jFileSize(pFile, pSizeView);
  }
  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  xLock(pFile, lockType) {
    this["log"]?.("jLock", pFile, lockType);
    return this.jLock(pFile, lockType);
  }
  /**
   * @param {number} pFile 
   * @param {number} lockType 
   * @returns {number|Promise<number>}
   */
  xUnlock(pFile, lockType) {
    this["log"]?.("jUnlock", pFile, lockType);
    return this.jUnlock(pFile, lockType);
  }
  /**
   * @param {number} pFile 
   * @param {number} pResOut 
   * @returns {number|Promise<number>}
   */
  xCheckReservedLock(pFile, pResOut) {
    const pResOutView = this.#makeTypedDataView("Int32", pResOut);
    this["log"]?.("jCheckReservedLock", pFile);
    return this.jCheckReservedLock(pFile, pResOutView);
  }
  /**
   * @param {number} pFile 
   * @param {number} op 
   * @param {number} pArg 
   * @returns {number|Promise<number>}
   */
  xFileControl(pFile, op, pArg) {
    const pArgView = new DataView(
      this._module.HEAPU8.buffer,
      this._module.HEAPU8.byteOffset + pArg
    );
    this["log"]?.("jFileControl", pFile, op, pArgView);
    return this.jFileControl(pFile, op, pArgView);
  }
  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xSectorSize(pFile) {
    this["log"]?.("jSectorSize", pFile);
    return this.jSectorSize(pFile);
  }
  /**
   * @param {number} pFile 
   * @returns {number|Promise<number>}
   */
  xDeviceCharacteristics(pFile) {
    this["log"]?.("jDeviceCharacteristics", pFile);
    return this.jDeviceCharacteristics(pFile);
  }
  /**
   * Wrapped DataView for pointer arguments.
   * Pointers to a single value are passed using DataView. A Proxy
   * wrapper prevents use of incorrect type or endianness.
   * @param {'Int32'|'BigInt64'} type 
   * @param {number} byteOffset 
   * @returns {DataView}
   */
  #makeTypedDataView(type, byteOffset) {
    const byteLength = type === "Int32" ? 4 : 8;
    const getter = `get${type}`;
    const setter = `set${type}`;
    const makeDataView = () => new DataView(
      this._module.HEAPU8.buffer,
      this._module.HEAPU8.byteOffset + byteOffset,
      byteLength
    );
    let dataView = makeDataView();
    return new Proxy(dataView, {
      get(_, prop) {
        if (dataView.buffer.byteLength === 0) {
          dataView = makeDataView();
        }
        if (prop === getter) {
          return function(byteOffset2, littleEndian) {
            if (!littleEndian) throw new Error("must be little endian");
            return dataView[prop](byteOffset2, littleEndian);
          };
        }
        if (prop === setter) {
          return function(byteOffset2, value, littleEndian) {
            if (!littleEndian) throw new Error("must be little endian");
            return dataView[prop](byteOffset2, value, littleEndian);
          };
        }
        if (typeof prop === "string" && prop.match(/^(get)|(set)/)) {
          throw new Error("invalid type");
        }
        const result = dataView[prop];
        return typeof result === "function" ? result.bind(dataView) : result;
      }
    });
  }
  /**
   * @param {number} byteOffset 
   * @param {number} byteLength 
   */
  #makeDataArray(byteOffset, byteLength) {
    let target = this._module.HEAPU8.subarray(byteOffset, byteOffset + byteLength);
    return new Proxy(target, {
      get: (_, prop, receiver) => {
        if (target.buffer.byteLength === 0) {
          target = this._module.HEAPU8.subarray(byteOffset, byteOffset + byteLength);
        }
        const result = target[prop];
        return typeof result === "function" ? result.bind(target) : result;
      }
    });
  }
  #decodeFilename(zName, flags) {
    if (flags & SQLITE_OPEN_URI) {
      let pName = zName;
      let state = 1;
      const charCodes = [];
      while (state) {
        const charCode = this._module.HEAPU8[pName++];
        if (charCode) {
          charCodes.push(charCode);
        } else {
          if (!this._module.HEAPU8[pName]) state = null;
          switch (state) {
            case 1:
              charCodes.push("?".charCodeAt(0));
              state = 2;
              break;
            case 2:
              charCodes.push("=".charCodeAt(0));
              state = 3;
              break;
            case 3:
              charCodes.push("&".charCodeAt(0));
              state = 2;
              break;
          }
        }
      }
      return new TextDecoder().decode(new Uint8Array(charCodes));
    }
    return zName ? this._module.UTF8ToString(zName) : null;
  }
};
function delegalize(lo32, hi32) {
  return hi32 * 4294967296 + lo32 + (lo32 < 0 ? 2 ** 32 : 0);
}

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/AccessHandlePoolVFS.js
var SECTOR_SIZE = 4096;
var HEADER_MAX_PATH_SIZE = 512;
var HEADER_FLAGS_SIZE = 4;
var HEADER_DIGEST_SIZE = 8;
var HEADER_CORPUS_SIZE = HEADER_MAX_PATH_SIZE + HEADER_FLAGS_SIZE;
var HEADER_OFFSET_FLAGS = HEADER_MAX_PATH_SIZE;
var HEADER_OFFSET_DIGEST = HEADER_CORPUS_SIZE;
var HEADER_OFFSET_DATA = SECTOR_SIZE;
var PERSISTENT_FILE_TYPES = SQLITE_OPEN_MAIN_DB | SQLITE_OPEN_MAIN_JOURNAL | SQLITE_OPEN_SUPER_JOURNAL | SQLITE_OPEN_WAL;
var DEFAULT_CAPACITY = 6;
var AccessHandlePoolVFS = class _AccessHandlePoolVFS extends FacadeVFS {
  log = null;
  //function(...args) { console.log(`[${contextName}]`, ...args) };
  // All the OPFS files the VFS uses are contained in one flat directory
  // specified in the constructor. No other files should be written here.
  #directoryPath;
  #directoryHandle;
  // The OPFS files all have randomly-generated names that do not match
  // the SQLite files whose data they contain. This map links those names
  // with their respective OPFS access handles.
  #mapAccessHandleToName = /* @__PURE__ */ new Map();
  // When a SQLite file is associated with an OPFS file, that association
  // is kept in #mapPathToAccessHandle. Each access handle is in exactly
  // one of #mapPathToAccessHandle or #availableAccessHandles.
  #mapPathToAccessHandle = /* @__PURE__ */ new Map();
  #availableAccessHandles = /* @__PURE__ */ new Set();
  #mapIdToFile = /* @__PURE__ */ new Map();
  static async create(name, module) {
    const vfs = new _AccessHandlePoolVFS(name, module);
    await vfs.isReady();
    return vfs;
  }
  constructor(name, module) {
    super(name, module);
    this.#directoryPath = name;
  }
  /**
   * @param {string?} zName
   * @param {number} fileId
   * @param {number} flags
   * @param {DataView} pOutFlags
   * @returns {number}
   */
  jOpen(zName, fileId, flags, pOutFlags) {
    try {
      const path = zName ? this.#getPath(zName) : Math.random().toString(36);
      let accessHandle = this.#mapPathToAccessHandle.get(path);
      if (!accessHandle && flags & SQLITE_OPEN_CREATE) {
        if (this.getSize() < this.getCapacity()) {
          [accessHandle] = this.#availableAccessHandles.keys();
          this.#setAssociatedPath(accessHandle, path, flags);
        } else {
          throw new Error("cannot create file");
        }
      }
      if (!accessHandle) {
        throw new Error("file not found");
      }
      const file = { path, flags, accessHandle };
      this.#mapIdToFile.set(fileId, file);
      pOutFlags.setInt32(0, flags, true);
      return SQLITE_OK;
    } catch (e) {
      console.error(e.message);
      return SQLITE_CANTOPEN;
    }
  }
  /**
   * @param {number} fileId
   * @returns {number}
   */
  jClose(fileId) {
    const file = this.#mapIdToFile.get(fileId);
    if (file) {
      file.accessHandle.flush();
      this.#mapIdToFile.delete(fileId);
      if (file.flags & SQLITE_OPEN_DELETEONCLOSE) {
        this.#deletePath(file.path);
      }
    }
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {Uint8Array} pData
   * @param {number} iOffset
   * @returns {number}
   */
  jRead(fileId, pData, iOffset) {
    const file = this.#mapIdToFile.get(fileId);
    const nBytes = file.accessHandle.read(pData.subarray(), { at: HEADER_OFFSET_DATA + iOffset });
    if (nBytes < pData.byteLength) {
      pData.fill(0, nBytes, pData.byteLength);
      return SQLITE_IOERR_SHORT_READ;
    }
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {Uint8Array} pData
   * @param {number} iOffset
   * @returns {number}
   */
  jWrite(fileId, pData, iOffset) {
    const file = this.#mapIdToFile.get(fileId);
    const nBytes = file.accessHandle.write(pData.subarray(), { at: HEADER_OFFSET_DATA + iOffset });
    return nBytes === pData.byteLength ? SQLITE_OK : SQLITE_IOERR;
  }
  /**
   * @param {number} fileId
   * @param {number} iSize
   * @returns {number}
   */
  jTruncate(fileId, iSize) {
    const file = this.#mapIdToFile.get(fileId);
    file.accessHandle.truncate(HEADER_OFFSET_DATA + iSize);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {number} flags
   * @returns {number}
   */
  jSync(fileId, flags) {
    const file = this.#mapIdToFile.get(fileId);
    file.accessHandle.flush();
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {DataView} pSize64
   * @returns {number}
   */
  jFileSize(fileId, pSize64) {
    const file = this.#mapIdToFile.get(fileId);
    const size = file.accessHandle.getSize() - HEADER_OFFSET_DATA;
    pSize64.setBigInt64(0, BigInt(size), true);
    return SQLITE_OK;
  }
  jSectorSize(fileId) {
    return SECTOR_SIZE;
  }
  jDeviceCharacteristics(fileId) {
    return SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
  }
  /**
   * @param {string} zName
   * @param {number} flags
   * @param {DataView} pResOut
   * @returns {number}
   */
  jAccess(zName, flags, pResOut) {
    const path = this.#getPath(zName);
    pResOut.setInt32(0, this.#mapPathToAccessHandle.has(path) ? 1 : 0, true);
    return SQLITE_OK;
  }
  /**
   * @param {string} zName
   * @param {number} syncDir
   * @returns {number}
   */
  jDelete(zName, syncDir) {
    const path = this.#getPath(zName);
    this.#deletePath(path);
    return SQLITE_OK;
  }
  async close() {
    await this.#releaseAccessHandles();
  }
  async isReady() {
    if (!this.#directoryHandle) {
      let handle = await navigator.storage.getDirectory();
      for (const d of this.#directoryPath.split("/")) {
        if (d) {
          handle = await handle.getDirectoryHandle(d, { create: true });
        }
      }
      this.#directoryHandle = handle;
      await this.#acquireAccessHandles();
      if (this.getCapacity() === 0) {
        await this.addCapacity(DEFAULT_CAPACITY);
      }
    }
    return true;
  }
  /**
   * Returns the number of SQLite files in the file system.
   * @returns {number}
   */
  getSize() {
    return this.#mapPathToAccessHandle.size;
  }
  /**
   * Returns the maximum number of SQLite files the file system can hold.
   * @returns {number}
   */
  getCapacity() {
    return this.#mapAccessHandleToName.size;
  }
  /**
   * Increase the capacity of the file system by n.
   * @param {number} n
   * @returns {Promise<number>}
   */
  async addCapacity(n) {
    for (let i = 0; i < n; ++i) {
      const name = Math.random().toString(36).replace("0.", "");
      const handle = await this.#directoryHandle.getFileHandle(name, { create: true });
      const accessHandle = await handle.createSyncAccessHandle();
      this.#mapAccessHandleToName.set(accessHandle, name);
      this.#setAssociatedPath(accessHandle, "", 0);
    }
    return n;
  }
  /**
   * Decrease the capacity of the file system by n. The capacity cannot be
   * decreased to fewer than the current number of SQLite files in the
   * file system.
   * @param {number} n
   * @returns {Promise<number>}
   */
  async removeCapacity(n) {
    let nRemoved = 0;
    for (const accessHandle of Array.from(this.#availableAccessHandles)) {
      if (nRemoved == n || this.getSize() === this.getCapacity()) return nRemoved;
      const name = this.#mapAccessHandleToName.get(accessHandle);
      await accessHandle.close();
      await this.#directoryHandle.removeEntry(name);
      this.#mapAccessHandleToName.delete(accessHandle);
      this.#availableAccessHandles.delete(accessHandle);
      ++nRemoved;
    }
    return nRemoved;
  }
  async #acquireAccessHandles() {
    const files = [];
    for await (const [name, handle] of this.#directoryHandle) {
      if (handle.kind === "file") {
        files.push([name, handle]);
      }
    }
    await Promise.all(
      files.map(async ([name, handle]) => {
        const accessHandle = await handle.createSyncAccessHandle();
        this.#mapAccessHandleToName.set(accessHandle, name);
        const path = this.#getAssociatedPath(accessHandle);
        if (path) {
          this.#mapPathToAccessHandle.set(path, accessHandle);
        } else {
          this.#availableAccessHandles.add(accessHandle);
        }
      })
    );
  }
  #releaseAccessHandles() {
    for (const accessHandle of this.#mapAccessHandleToName.keys()) {
      accessHandle.close();
    }
    this.#mapAccessHandleToName.clear();
    this.#mapPathToAccessHandle.clear();
    this.#availableAccessHandles.clear();
  }
  /**
   * Read and return the associated path from an OPFS file header.
   * Empty string is returned for an unassociated OPFS file.
   * @param accessHandle FileSystemSyncAccessHandle
   * @returns {string} path or empty string
   */
  #getAssociatedPath(accessHandle) {
    const corpus = new Uint8Array(HEADER_CORPUS_SIZE);
    accessHandle.read(corpus, { at: 0 });
    const dataView = new DataView(corpus.buffer, corpus.byteOffset);
    const flags = dataView.getUint32(HEADER_OFFSET_FLAGS);
    if (corpus[0] && (flags & SQLITE_OPEN_DELETEONCLOSE || (flags & PERSISTENT_FILE_TYPES) === 0)) {
      console.warn(`Remove file with unexpected flags ${flags.toString(16)}`);
      this.#setAssociatedPath(accessHandle, "", 0);
      return "";
    }
    const fileDigest = new Uint32Array(HEADER_DIGEST_SIZE / 4);
    accessHandle.read(fileDigest, { at: HEADER_OFFSET_DIGEST });
    const computedDigest = this.#computeDigest(corpus);
    if (fileDigest.every((value, i) => value === computedDigest[i])) {
      const pathBytes = corpus.findIndex((value) => value === 0);
      if (pathBytes === 0) {
        accessHandle.truncate(HEADER_OFFSET_DATA);
      }
      return new TextDecoder().decode(corpus.subarray(0, pathBytes));
    } else {
      console.warn("Disassociating file with bad digest.");
      this.#setAssociatedPath(accessHandle, "", 0);
      return "";
    }
  }
  /**
   * Set the path on an OPFS file header.
   * @param accessHandle FileSystemSyncAccessHandle
   * @param {string} path
   * @param {number} flags
   */
  #setAssociatedPath(accessHandle, path, flags) {
    const corpus = new Uint8Array(HEADER_CORPUS_SIZE);
    const encodedResult = new TextEncoder().encodeInto(path, corpus);
    if (encodedResult.written >= HEADER_MAX_PATH_SIZE) {
      throw new Error("path too long");
    }
    const dataView = new DataView(corpus.buffer, corpus.byteOffset);
    dataView.setUint32(HEADER_OFFSET_FLAGS, flags);
    const digest = this.#computeDigest(corpus);
    accessHandle.write(corpus, { at: 0 });
    accessHandle.write(digest, { at: HEADER_OFFSET_DIGEST });
    accessHandle.flush();
    if (path) {
      this.#mapPathToAccessHandle.set(path, accessHandle);
      this.#availableAccessHandles.delete(accessHandle);
    } else {
      accessHandle.truncate(HEADER_OFFSET_DATA);
      this.#availableAccessHandles.add(accessHandle);
    }
  }
  /**
   * We need a synchronous digest function so can't use WebCrypto.
   * Adapted from https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
   * @param {Uint8Array} corpus
   * @returns {ArrayBuffer} 64-bit digest
   */
  #computeDigest(corpus) {
    if (!corpus[0]) {
      return new Uint32Array([4274806656, 2899230775]);
    }
    let h1 = 3735928559;
    let h2 = 1103547991;
    for (const value of corpus) {
      h1 = Math.imul(h1 ^ value, 2654435761);
      h2 = Math.imul(h2 ^ value, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return new Uint32Array([h1 >>> 0, h2 >>> 0]);
  }
  /**
   * Convert a bare filename, path, or URL to a UNIX-style path.
   * @param {string|URL} nameOrURL
   * @returns {string} path
   */
  #getPath(nameOrURL) {
    const url = typeof nameOrURL === "string" ? new URL(nameOrURL, "file://localhost/") : nameOrURL;
    return url.pathname;
  }
  /**
   * Remove the association between a path and an OPFS file.
   * @param {string} path
   */
  #deletePath(path) {
    const accessHandle = this.#mapPathToAccessHandle.get(path);
    if (accessHandle) {
      this.#mapPathToAccessHandle.delete(path);
      this.#setAssociatedPath(accessHandle, "", 0);
    }
  }
};

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/MemoryVFS.js
var MemoryVFS = class _MemoryVFS extends FacadeVFS {
  // Map of existing files, keyed by filename.
  mapNameToFile = /* @__PURE__ */ new Map();
  // Map of open files, keyed by id (sqlite3_file pointer).
  mapIdToFile = /* @__PURE__ */ new Map();
  static async create(name, module) {
    const vfs = new _MemoryVFS(name, module);
    await vfs.isReady();
    return vfs;
  }
  constructor(name, module) {
    super(name, module);
  }
  close() {
    for (const fileId of this.mapIdToFile.keys()) {
      this.jClose(fileId);
    }
  }
  /**
   * @param {string?} filename
   * @param {number} fileId
   * @param {number} flags
   * @param {DataView} pOutFlags
   * @returns {number|Promise<number>}
   */
  jOpen(filename, fileId, flags, pOutFlags) {
    const url = new URL(filename || Math.random().toString(36).slice(2), "file://");
    const pathname = url.pathname;
    let file = this.mapNameToFile.get(pathname);
    if (!file) {
      if (flags & SQLITE_OPEN_CREATE) {
        file = {
          pathname,
          flags,
          size: 0,
          data: new ArrayBuffer(0)
        };
        this.mapNameToFile.set(pathname, file);
      } else {
        return SQLITE_CANTOPEN;
      }
    }
    this.mapIdToFile.set(fileId, file);
    pOutFlags.setInt32(0, flags, true);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @returns {number|Promise<number>}
   */
  jClose(fileId) {
    const file = this.mapIdToFile.get(fileId);
    this.mapIdToFile.delete(fileId);
    if (file.flags & SQLITE_OPEN_DELETEONCLOSE) {
      this.mapNameToFile.delete(file.pathname);
    }
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {Uint8Array} pData
   * @param {number} iOffset
   * @returns {number|Promise<number>}
   */
  jRead(fileId, pData, iOffset) {
    const file = this.mapIdToFile.get(fileId);
    const bgn = Math.min(iOffset, file.size);
    const end = Math.min(iOffset + pData.byteLength, file.size);
    const nBytes = end - bgn;
    if (nBytes) {
      pData.set(new Uint8Array(file.data, bgn, nBytes));
    }
    if (nBytes < pData.byteLength) {
      pData.fill(0, nBytes);
      return SQLITE_IOERR_SHORT_READ;
    }
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {Uint8Array} pData
   * @param {number} iOffset
   * @returns {number|Promise<number>}
   */
  jWrite(fileId, pData, iOffset) {
    const file = this.mapIdToFile.get(fileId);
    if (iOffset + pData.byteLength > file.data.byteLength) {
      const newSize = Math.max(iOffset + pData.byteLength, 2 * file.data.byteLength);
      const data = new ArrayBuffer(newSize);
      new Uint8Array(data).set(new Uint8Array(file.data, 0, file.size));
      file.data = data;
    }
    new Uint8Array(file.data, iOffset, pData.byteLength).set(pData);
    file.size = Math.max(file.size, iOffset + pData.byteLength);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {number} iSize
   * @returns {number|Promise<number>}
   */
  jTruncate(fileId, iSize) {
    const file = this.mapIdToFile.get(fileId);
    file.size = Math.min(file.size, iSize);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {DataView} pSize64
   * @returns {number|Promise<number>}
   */
  jFileSize(fileId, pSize64) {
    const file = this.mapIdToFile.get(fileId);
    pSize64.setBigInt64(0, BigInt(file.size), true);
    return SQLITE_OK;
  }
  /**
   * @param {string} name
   * @param {number} syncDir
   * @returns {number|Promise<number>}
   */
  jDelete(name, syncDir) {
    const url = new URL(name, "file://");
    const pathname = url.pathname;
    this.mapNameToFile.delete(pathname);
    return SQLITE_OK;
  }
  /**
   * @param {string} name
   * @param {number} flags
   * @param {DataView} pResOut
   * @returns {number|Promise<number>}
   */
  jAccess(name, flags, pResOut) {
    const url = new URL(name, "file://");
    const pathname = url.pathname;
    const file = this.mapNameToFile.get(pathname);
    pResOut.setInt32(0, file ? 1 : 0, true);
    return SQLITE_OK;
  }
};

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/sqlite-api.js
var MAX_INT64 = 0x7fffffffffffffffn;
var MIN_INT64 = -0x8000000000000000n;
var AsyncFunction2 = Object.getPrototypeOf(async function() {
}).constructor;
var SQLiteError = class extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};
var async = true;
function Factory(Module) {
  const sqlite3 = {};
  Module.retryOps = [];
  const sqliteFreeAddress = Module._getSqliteFree();
  const tmp = Module._malloc(8);
  const tmpPtr = [tmp, tmp + 4];
  const textEncoder = new TextEncoder();
  function createUTF8(s) {
    if (typeof s !== "string") return 0;
    const utf8 = textEncoder.encode(s);
    const zts = Module._sqlite3_malloc(utf8.byteLength + 1);
    Module.HEAPU8.set(utf8, zts);
    Module.HEAPU8[zts + utf8.byteLength] = 0;
    return zts;
  }
  function cvt32x2ToBigInt(lo32, hi32) {
    return BigInt(hi32) << 32n | BigInt(lo32) & 0xffffffffn;
  }
  const cvt32x2AsSafe = (function() {
    const hiMax = BigInt(Number.MAX_SAFE_INTEGER) >> 32n;
    const hiMin = BigInt(Number.MIN_SAFE_INTEGER) >> 32n;
    return function(lo32, hi32) {
      if (hi32 > hiMax || hi32 < hiMin) {
        return cvt32x2ToBigInt(lo32, hi32);
      } else {
        return hi32 * 4294967296 + (lo32 & 2147483647) - (lo32 & 2147483648);
      }
    };
  })();
  const databases = /* @__PURE__ */ new Set();
  function verifyDatabase(db) {
    if (!databases.has(db)) {
      throw new SQLiteError("not a database", SQLITE_MISUSE);
    }
  }
  const mapStmtToDB = /* @__PURE__ */ new Map();
  function verifyStatement(stmt) {
    if (!mapStmtToDB.has(stmt)) {
      throw new SQLiteError("not a statement", SQLITE_MISUSE);
    }
  }
  sqlite3.backup = (function() {
    const init = Module.cwrap("sqlite3_backup_init", ...decl("nsns:n"));
    const step2 = Module.cwrap("sqlite3_backup_step", ...decl("nn:n"));
    const finish = Module.cwrap("sqlite3_backup_finish", ...decl("n:n"));
    return async function(destDb, destName, srcDb, srcName) {
      verifyDatabase(destDb);
      verifyDatabase(srcDb);
      const backup = init(destDb, destName, srcDb, srcName);
      if (!backup) {
        check("sqlite3_backup_init", SQLITE_ERROR, destDb);
        return;
      }
      step2(backup, -1);
      const result = finish(backup);
      return check("sqlite3_backup_finish", result, destDb);
    };
  })();
  sqlite3.bind_collection = function(stmt, bindings) {
    verifyStatement(stmt);
    const isArray = Array.isArray(bindings);
    const nBindings = sqlite3.bind_parameter_count(stmt);
    for (let i = 1; i <= nBindings; ++i) {
      const key = isArray ? i - 1 : sqlite3.bind_parameter_name(stmt, i);
      const value = bindings[key];
      if (value !== void 0) {
        sqlite3.bind(stmt, i, value);
      }
    }
    return SQLITE_OK;
  };
  sqlite3.bind = function(stmt, i, value) {
    verifyStatement(stmt);
    switch (typeof value) {
      case "number":
        if (value === (value | 0)) {
          return sqlite3.bind_int(stmt, i, value);
        } else {
          return sqlite3.bind_double(stmt, i, value);
        }
      case "string":
        return sqlite3.bind_text(stmt, i, value);
      case "boolean":
        return sqlite3.bind_int(stmt, i, value ? 1 : 0);
      default:
        if (value instanceof Uint8Array || Array.isArray(value)) {
          return sqlite3.bind_blob(stmt, i, value);
        } else if (value === null) {
          return sqlite3.bind_null(stmt, i);
        } else if (typeof value === "bigint") {
          return sqlite3.bind_int64(stmt, i, value);
        } else if (value === void 0) {
          return SQLITE_NOTICE;
        } else {
          console.warn("unknown binding converted to null", value);
          return sqlite3.bind_null(stmt, i);
        }
    }
  };
  sqlite3.bind_blob = (function() {
    const fname = "sqlite3_bind_blob";
    const f = Module.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module._sqlite3_malloc(byteLength);
      Module.HEAPU8.subarray(ptr).set(value);
      const result = f(stmt, i, ptr, byteLength, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  sqlite3.bind_parameter_count = (function() {
    const fname = "sqlite3_bind_parameter_count";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  })();
  sqlite3.bind_double = (function() {
    const fname = "sqlite3_bind_double";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  sqlite3.bind_int = (function() {
    const fname = "sqlite3_bind_int";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > 2147483647 || value < -2147483648) return SQLITE_RANGE;
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  sqlite3.bind_int64 = (function() {
    const fname = "sqlite3_bind_int64";
    const f = Module.cwrap(fname, ...decl("nnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > MAX_INT64 || value < MIN_INT64) return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      const result = f(stmt, i, Number(lo32), Number(hi32));
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  sqlite3.bind_null = (function() {
    const fname = "sqlite3_bind_null";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  sqlite3.bind_parameter_index = (function() {
    const fname = "sqlite3_bind_parameter_index";
    const f = Module.cwrap(fname, ...decl("ns:n"));
    return function(stmt, name) {
      verifyStatement(stmt);
      const result = f(stmt, name);
      return result;
    };
  })();
  sqlite3.bind_parameter_name = (function() {
    const fname = "sqlite3_bind_parameter_name";
    const f = Module.cwrap(fname, ...decl("n:s"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return result;
    };
  })();
  sqlite3.bind_text = (function() {
    const fname = "sqlite3_bind_text";
    const f = Module.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const ptr = createUTF8(value);
      const result = f(stmt, i, ptr, -1, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  sqlite3.changes = (function() {
    const fname = "sqlite3_changes";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(db) {
      verifyDatabase(db);
      const result = f(db);
      return result;
    };
  })();
  sqlite3.clear_bindings = (function() {
    const fname = "sqlite3_clear_bindings";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  sqlite3.close = (function() {
    const fname = "sqlite3_close";
    const f = Module.cwrap(fname, ...decl("n:n"), { async });
    return async function(db) {
      verifyDatabase(db);
      const result = await f(db);
      databases.delete(db);
      return check(fname, result, db);
    };
  })();
  sqlite3.column = function(stmt, iCol) {
    verifyStatement(stmt);
    const type = sqlite3.column_type(stmt, iCol);
    switch (type) {
      case SQLITE_BLOB:
        return sqlite3.column_blob(stmt, iCol);
      case SQLITE_FLOAT:
        return sqlite3.column_double(stmt, iCol);
      case SQLITE_INTEGER:
        const lo32 = sqlite3.column_int(stmt, iCol);
        const hi32 = Module.getTempRet0();
        return cvt32x2AsSafe(lo32, hi32);
      case SQLITE_NULL:
        return null;
      case SQLITE_TEXT:
        return sqlite3.column_text(stmt, iCol);
      default:
        throw new SQLiteError("unknown type", type);
    }
  };
  sqlite3.column_blob = (function() {
    const fname = "sqlite3_column_blob";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const nBytes = sqlite3.column_bytes(stmt, iCol);
      const address = f(stmt, iCol);
      const result = Module.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  })();
  sqlite3.column_bytes = (function() {
    const fname = "sqlite3_column_bytes";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();
  sqlite3.column_count = (function() {
    const fname = "sqlite3_column_count";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  })();
  sqlite3.column_double = (function() {
    const fname = "sqlite3_column_double";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();
  sqlite3.column_int = (function() {
    const fname = "sqlite3_column_int64";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();
  sqlite3.column_int64 = (function() {
    const fname = "sqlite3_column_int64";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const lo32 = f(stmt, iCol);
      const hi32 = Module.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  })();
  sqlite3.column_int_safe = (function() {
    const fname = "sqlite3_column_int64";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const lo32 = f(stmt, iCol);
      const hi32 = Module.getTempRet0();
      return cvt32x2AsSafe(lo32, hi32);
    };
  })();
  sqlite3.column_name = (function() {
    const fname = "sqlite3_column_name";
    const f = Module.cwrap(fname, ...decl("nn:s"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();
  sqlite3.column_names = function(stmt) {
    const columns = [];
    const nColumns = sqlite3.column_count(stmt);
    for (let i = 0; i < nColumns; ++i) {
      columns.push(sqlite3.column_name(stmt, i));
    }
    return columns;
  };
  sqlite3.column_text = (function() {
    const fname = "sqlite3_column_text";
    const f = Module.cwrap(fname, ...decl("nn:s"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();
  sqlite3.column_type = (function() {
    const fname = "sqlite3_column_type";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  })();
  sqlite3.create_function = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
    verifyDatabase(db);
    function adapt(f) {
      return f instanceof AsyncFunction2 ? (async (ctx, n, values) => f(ctx, Module.HEAP32.subarray(values / 4, values / 4 + n))) : ((ctx, n, values) => f(ctx, Module.HEAP32.subarray(values / 4, values / 4 + n)));
    }
    const result = Module.create_function(
      db,
      zFunctionName,
      nArg,
      eTextRep,
      pApp,
      xFunc && adapt(xFunc),
      xStep && adapt(xStep),
      xFinal
    );
    return check("sqlite3_create_function", result, db);
  };
  sqlite3.data_count = (function() {
    const fname = "sqlite3_data_count";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  })();
  sqlite3.db_filename = (function() {
    const fname = "sqlite3_db_filename";
    const f = Module.cwrap(fname, ...decl("ns:s"));
    return function(db, schema) {
      verifyDatabase(db);
      const result = f(db, schema);
      return result;
    };
  })();
  sqlite3.deserialize = (function() {
    const fname = "sqlite3_deserialize";
    const f = Module.cwrap(fname, ...decl("nsnnnn:n"));
    return function(db, schema, data) {
      const flags = SQLITE_DESERIALIZE_RESIZEABLE | SQLITE_DESERIALIZE_FREEONCLOSE;
      verifyDatabase(db);
      const size = data.byteLength;
      const ptr = Module._sqlite3_malloc(size);
      Module.HEAPU8.subarray(ptr).set(data);
      const result = f(db, schema, ptr, size, size, flags);
      return check(fname, result, db);
    };
  })();
  sqlite3.exec = async function(db, sql, callback) {
    for await (const stmt of sqlite3.statements(db, sql)) {
      let columns;
      while (await sqlite3.step(stmt) === SQLITE_ROW) {
        if (callback) {
          columns = columns ?? sqlite3.column_names(stmt);
          const row = sqlite3.row(stmt);
          await callback(row, columns);
        }
      }
    }
    return SQLITE_OK;
  };
  sqlite3.finalize = (function() {
    const fname = "sqlite3_finalize";
    const f = Module.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      const result = await f(stmt);
      mapStmtToDB.delete(stmt);
      return result;
    };
  })();
  sqlite3.get_autocommit = (function() {
    const fname = "sqlite3_get_autocommit";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(db) {
      const result = f(db);
      return result;
    };
  })();
  sqlite3.last_insert_rowid = (function() {
    const fname = "sqlite3_last_insert_rowid";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(db) {
      const lo32 = f(db);
      const hi32 = Module.getTempRet0();
      return cvt32x2AsSafe(lo32, hi32);
    };
  })();
  sqlite3.libversion = (function() {
    const fname = "sqlite3_libversion";
    const f = Module.cwrap(fname, ...decl(":s"));
    return function() {
      const result = f();
      return result;
    };
  })();
  sqlite3.libversion_number = (function() {
    const fname = "sqlite3_libversion_number";
    const f = Module.cwrap(fname, ...decl(":n"));
    return function() {
      const result = f();
      return result;
    };
  })();
  sqlite3.limit = (function() {
    const fname = "sqlite3_limit";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(db, id, newVal) {
      const result = f(db, id, newVal);
      return result;
    };
  })();
  sqlite3.next_stmt = (function() {
    const fname = "sqlite3_next_stmt";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(db, stmt) {
      verifyDatabase(db);
      const result = f(db, stmt || 0);
      return result;
    };
  })();
  sqlite3.open_v2 = (function() {
    const fname = "sqlite3_open_v2";
    const f = Module.cwrap(fname, ...decl("snnn:n"), { async });
    return async function(zFilename, flags, zVfs) {
      flags = flags || SQLITE_OPEN_CREATE | SQLITE_OPEN_READWRITE;
      zVfs = createUTF8(zVfs);
      try {
        const rc = await retry(() => f(zFilename, tmpPtr[0], flags, zVfs));
        const db = Module.getValue(tmpPtr[0], "*");
        databases.add(db);
        Module.ccall("RegisterExtensionFunctions", "void", ["number"], [db]);
        check(fname, rc);
        return db;
      } finally {
        Module._sqlite3_free(zVfs);
      }
    };
  })();
  sqlite3.progress_handler = function(db, nProgressOps, handler, userData) {
    verifyDatabase(db);
    Module.progress_handler(db, nProgressOps, handler, userData);
  };
  ;
  sqlite3.reset = (function() {
    const fname = "sqlite3_reset";
    const f = Module.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const result = await f(stmt);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  })();
  sqlite3.result = function(context, value) {
    switch (typeof value) {
      case "number":
        if (value === (value | 0)) {
          sqlite3.result_int(context, value);
        } else {
          sqlite3.result_double(context, value);
        }
        break;
      case "string":
        sqlite3.result_text(context, value);
        break;
      default:
        if (value instanceof Uint8Array || Array.isArray(value)) {
          sqlite3.result_blob(context, value);
        } else if (value === null) {
          sqlite3.result_null(context);
        } else if (typeof value === "bigint") {
          return sqlite3.result_int64(context, value);
        } else {
          console.warn("unknown result converted to null", value);
          sqlite3.result_null(context);
        }
        break;
    }
  };
  sqlite3.result_blob = (function() {
    const fname = "sqlite3_result_blob";
    const f = Module.cwrap(fname, ...decl("nnnn:n"));
    return function(context, value) {
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module._sqlite3_malloc(byteLength);
      Module.HEAPU8.subarray(ptr).set(value);
      f(context, ptr, byteLength, sqliteFreeAddress);
    };
  })();
  sqlite3.result_double = (function() {
    const fname = "sqlite3_result_double";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  })();
  sqlite3.result_int = (function() {
    const fname = "sqlite3_result_int";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  })();
  sqlite3.result_int64 = (function() {
    const fname = "sqlite3_result_int64";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(context, value) {
      if (value > MAX_INT64 || value < MIN_INT64) return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      f(context, Number(lo32), Number(hi32));
    };
  })();
  sqlite3.result_null = (function() {
    const fname = "sqlite3_result_null";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(context) {
      f(context);
    };
  })();
  sqlite3.result_text = (function() {
    const fname = "sqlite3_result_text";
    const f = Module.cwrap(fname, ...decl("nnnn:n"));
    return function(context, value) {
      const ptr = createUTF8(value);
      f(context, ptr, -1, sqliteFreeAddress);
    };
  })();
  sqlite3.row = function(stmt) {
    const row = [];
    const nColumns = sqlite3.data_count(stmt);
    for (let i = 0; i < nColumns; ++i) {
      const value = sqlite3.column(stmt, i);
      row.push(value?.buffer === Module.HEAPU8.buffer ? value.slice() : value);
    }
    return row;
  };
  sqlite3.serialize = (function() {
    const fname = "sqlite3_serialize";
    const f = Module.cwrap(fname, ...decl("nsnn:n"));
    return function(db, schema) {
      verifyDatabase(db);
      const size = tmpPtr[0];
      const flags = 0;
      const ptr = f(db, schema, size, flags);
      if (!ptr) {
        check(fname, SQLITE_ERROR, db);
        return null;
      }
      const bufferSize = Module.getValue(size, "*");
      const buffer = Module.HEAPU8.subarray(ptr, ptr + bufferSize);
      const result = new Uint8Array(buffer);
      Module._sqlite3_free(ptr);
      return result;
    };
  })();
  sqlite3.set_authorizer = function(db, xAuth, pApp) {
    verifyDatabase(db);
    function cvtArgs(_, iAction, p3, p4, p5, p6) {
      return [
        _,
        iAction,
        Module.UTF8ToString(p3),
        Module.UTF8ToString(p4),
        Module.UTF8ToString(p5),
        Module.UTF8ToString(p6)
      ];
    }
    ;
    function adapt(f) {
      return f instanceof AsyncFunction2 ? (async (_, iAction, p3, p4, p5, p6) => f(...cvtArgs(_, iAction, p3, p4, p5, p6))) : ((_, iAction, p3, p4, p5, p6) => f(...cvtArgs(_, iAction, p3, p4, p5, p6)));
    }
    const result = Module.set_authorizer(db, adapt(xAuth), pApp);
    return check("sqlite3_set_authorizer", result, db);
  };
  ;
  sqlite3.sql = (function() {
    const fname = "sqlite3_sql";
    const f = Module.cwrap(fname, ...decl("n:s"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  })();
  sqlite3.statements = function(db, sql, options = {}) {
    const prepare2 = Module.cwrap(
      "sqlite3_prepare_v3",
      "number",
      ["number", "number", "number", "number", "number", "number"],
      { async: true }
    );
    return (async function* () {
      const onFinally = [];
      try {
        let maybeFinalize = function() {
          if (stmt && !options.unscoped) {
            sqlite3.finalize(stmt);
          }
          stmt = 0;
        };
        const utf8 = textEncoder.encode(sql);
        const allocSize = utf8.byteLength - utf8.byteLength % 4 + 12;
        const pzHead = Module._sqlite3_malloc(allocSize);
        const pzEnd = pzHead + utf8.byteLength + 1;
        onFinally.push(() => Module._sqlite3_free(pzHead));
        Module.HEAPU8.set(utf8, pzHead);
        Module.HEAPU8[pzEnd - 1] = 0;
        const pStmt = pzHead + allocSize - 8;
        const pzTail = pzHead + allocSize - 4;
        let stmt;
        onFinally.push(maybeFinalize);
        Module.setValue(pzTail, pzHead, "*");
        do {
          maybeFinalize();
          const zTail = Module.getValue(pzTail, "*");
          const rc = await retry(() => {
            return prepare2(
              db,
              zTail,
              pzEnd - pzTail,
              options.flags || 0,
              pStmt,
              pzTail
            );
          });
          if (rc !== SQLITE_OK) {
            check("sqlite3_prepare_v3", rc, db);
          }
          stmt = Module.getValue(pStmt, "*");
          if (stmt) {
            mapStmtToDB.set(stmt, db);
            yield stmt;
          }
        } while (stmt);
      } finally {
        while (onFinally.length) {
          onFinally.pop()();
        }
      }
    })();
  };
  sqlite3.step = (function() {
    const fname = "sqlite3_step";
    const f = Module.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const rc = await retry(() => f(stmt));
      return check(fname, rc, mapStmtToDB.get(stmt), [SQLITE_ROW, SQLITE_DONE]);
    };
  })();
  sqlite3.commit_hook = function(db, xCommitHook) {
    verifyDatabase(db);
    Module.commit_hook(db, xCommitHook);
  };
  sqlite3.update_hook = function(db, xUpdateHook) {
    verifyDatabase(db);
    function cvtArgs(iUpdateType, dbName, tblName, lo32, hi32) {
      return [
        iUpdateType,
        Module.UTF8ToString(dbName),
        Module.UTF8ToString(tblName),
        cvt32x2ToBigInt(lo32, hi32)
      ];
    }
    ;
    function adapt(f) {
      return f instanceof AsyncFunction2 ? (async (iUpdateType, dbName, tblName, lo32, hi32) => f(...cvtArgs(iUpdateType, dbName, tblName, lo32, hi32))) : ((iUpdateType, dbName, tblName, lo32, hi32) => f(...cvtArgs(iUpdateType, dbName, tblName, lo32, hi32)));
    }
    Module.update_hook(db, adapt(xUpdateHook));
  };
  ;
  sqlite3.value = function(pValue) {
    const type = sqlite3.value_type(pValue);
    switch (type) {
      case SQLITE_BLOB:
        return sqlite3.value_blob(pValue);
      case SQLITE_FLOAT:
        return sqlite3.value_double(pValue);
      case SQLITE_INTEGER:
        const lo32 = sqlite3.value_int(pValue);
        const hi32 = Module.getTempRet0();
        return cvt32x2AsSafe(lo32, hi32);
      case SQLITE_NULL:
        return null;
      case SQLITE_TEXT:
        return sqlite3.value_text(pValue);
      default:
        throw new SQLiteError("unknown type", type);
    }
  };
  sqlite3.value_blob = (function() {
    const fname = "sqlite3_value_blob";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const nBytes = sqlite3.value_bytes(pValue);
      const address = f(pValue);
      const result = Module.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  })();
  sqlite3.value_bytes = (function() {
    const fname = "sqlite3_value_bytes";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();
  sqlite3.value_double = (function() {
    const fname = "sqlite3_value_double";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();
  sqlite3.value_int = (function() {
    const fname = "sqlite3_value_int64";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();
  sqlite3.value_int64 = (function() {
    const fname = "sqlite3_value_int64";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const lo32 = f(pValue);
      const hi32 = Module.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  })();
  sqlite3.value_text = (function() {
    const fname = "sqlite3_value_text";
    const f = Module.cwrap(fname, ...decl("n:s"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();
  sqlite3.value_type = (function() {
    const fname = "sqlite3_value_type";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  })();
  sqlite3.vfs_register = function(vfs, makeDefault) {
    const result = Module.vfs_register(vfs, makeDefault);
    return check("sqlite3_vfs_register", result);
  };
  sqlite3.changeset_apply = (function() {
    const fname = "sqlite3changeset_apply";
    const f = Module.cwrap(fname, ...decl("nnnnnn:n"));
    return function(db, changeset) {
      verifyDatabase(db);
      const size = changeset.byteLength;
      const buffer = Module._sqlite3_malloc(size);
      Module.HEAPU8.subarray(buffer).set(changeset);
      const onConflict = () => {
        return SQLITE_CHANGESET_REPLACE;
      };
      const result = f(db, size, buffer, null, onConflict, null);
      Module._sqlite3_free(buffer);
      return check(fname, result, db);
    };
  })();
  sqlite3.changeset_invert = (function() {
    const fname = "sqlite3changeset_invert";
    const f = Module.cwrap(fname, ...decl("nnnn:n"));
    return function(changeset) {
      const inSize = changeset.byteLength;
      const inBuffer = Module._sqlite3_malloc(inSize);
      Module.HEAPU8.subarray(inBuffer).set(changeset);
      const outSize = tmpPtr[0];
      const outBuffer = tmpPtr[1];
      const result = f(inSize, inBuffer, outSize, outBuffer);
      Module._sqlite3_free(inBuffer);
      check(fname, result);
      const bufferSize = Module.getValue(outSize, "*");
      const bufferPtr = Module.getValue(outBuffer, "*");
      const buffer = Module.HEAPU8.subarray(bufferPtr, bufferPtr + bufferSize);
      const inverted = new Uint8Array(buffer);
      Module._sqlite3_free(outBuffer);
      return inverted;
    };
  })();
  sqlite3.session_create = (function() {
    const fname = "sqlite3session_create";
    const f = Module.cwrap(fname, ...decl("nsn:n"));
    return function(db, dbName) {
      verifyDatabase(db);
      const ptrSession = tmpPtr[0];
      const result = f(db, dbName, ptrSession);
      check(fname, result, db);
      const session = Module.getValue(ptrSession, "*");
      return session;
    };
  })();
  sqlite3.session_delete = (function() {
    const fname = "sqlite3session_delete";
    const f = Module.cwrap(fname, ...decl("n:v"));
    return function(session) {
      f(session);
    };
  })();
  sqlite3.session_enable = (function() {
    const fname = "sqlite3session_enable";
    const f = Module.cwrap(fname, ...decl("nn:v"));
    return function(session, enabled) {
      f(session, enabled ? 1 : 0);
    };
  })();
  sqlite3.session_attach = (function() {
    const fname = "sqlite3session_attach";
    const f = Module.cwrap(fname, ...decl("ns:n"));
    return function(session, tableName) {
      const result = f(session, tableName);
      return check(fname, result);
    };
  })();
  sqlite3.session_changeset = (function() {
    const fname = "sqlite3session_changeset";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(session) {
      const bufferSize = tmpPtr[0];
      const ptr = tmpPtr[1];
      const result = f(session, bufferSize, ptr);
      check(fname, result);
      const size = Module.getValue(bufferSize, "*");
      const bufferPtr = Module.getValue(ptr, "*");
      const buffer = Module.HEAPU8.subarray(bufferPtr, bufferPtr + size);
      const changeset = new Uint8Array(buffer);
      Module._sqlite3_free(ptr);
      return changeset;
    };
  })();
  sqlite3.session_changeset_inverted = (function() {
    const fNameChangeset = "sqlite3session_changeset";
    const fNameInvert = "sqlite3changeset_invert";
    const fChangeset = Module.cwrap(fNameChangeset, ...decl("nnn:n"));
    const fInvert = Module.cwrap(fNameInvert, ...decl("nnnn:n"));
    return function(session) {
      const bufferSize = tmpPtr[0];
      const ptr = tmpPtr[1];
      const changesetResult = fChangeset(session, bufferSize, ptr);
      check(fNameChangeset, changesetResult);
      const size = Module.getValue(bufferSize, "*");
      const buffer = Module.getValue(ptr, "*");
      const outSize = tmpPtr[0];
      const outBuffer = tmpPtr[1];
      const invertResult = fInvert(size, buffer, outSize, outBuffer);
      Module._sqlite3_free(buffer);
      check(fNameInvert, invertResult);
      const outSizeValue = Module.getValue(outSize, "*");
      const outBufferPtr = Module.getValue(outBuffer, "*");
      const inverted = Module.HEAPU8.subarray(outBufferPtr, outBufferPtr + outSizeValue);
      const invertedArray = new Uint8Array(inverted);
      Module._sqlite3_free(outBuffer);
      return invertedArray;
    };
  })();
  function check(fname, result, db = null, allowed = [SQLITE_OK]) {
    if (allowed.includes(result)) return result;
    let message;
    if (db) {
      const errcode = Module.ccall("sqlite3_errcode", "number", ["number"], [db]);
      const errmsg = Module.ccall("sqlite3_errmsg", "string", ["number"], [db]);
      message = "Error code " + errcode + ": " + errmsg;
    } else {
      message = fname;
    }
    throw new SQLiteError(message, result);
  }
  async function retry(f) {
    let rc;
    do {
      if (Module.retryOps.length) {
        await Promise.all(Module.retryOps);
        Module.retryOps = [];
      }
      rc = await f();
    } while (rc && Module.retryOps.length);
    return rc;
  }
  return sqlite3;
}
function decl(s) {
  const result = [];
  const m = s.match(/([ns@]*):([nsv@])/);
  switch (m[2]) {
    case "n":
      result.push("number");
      break;
    case "s":
      result.push("string");
      break;
    case "v":
      result.push(null);
      break;
  }
  const args = [];
  for (let c of m[1]) {
    switch (c) {
      case "n":
        args.push("number");
        break;
      case "s":
        args.push("string");
        break;
    }
  }
  result.push(args);
  return result;
}

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/worker.ts
var import_wa_sqlite = __toESM(require_wa_sqlite());

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/wa-sqlite/wa-sqlite.wasm
var wa_sqlite_default = "./wa-sqlite-GLPMMWN7.wasm";

// ../../node_modules/.bun/expo-sqlite@16.0.10+a716aaf91d2c926b/node_modules/expo-sqlite/web/worker.ts
var VFS_NAME_PERSISTENT = "expo-sqlite";
var VFS_NAME_MEMORY = "expo-sqlite-memfs";
var MAX_INT32 = 2147483647;
var MIN_INT32 = -2147483648;
var _sqlite3 = null;
var _vfs = null;
var _vfsMemory = null;
var databaseIdMap = /* @__PURE__ */ new Map();
var statementIdMap = /* @__PURE__ */ new Map();
var sessionIdMap = /* @__PURE__ */ new Map();
var SQLiteErrorException = class extends Error {
};
self.onmessage = async (event) => {
  let result = null;
  let error = null;
  try {
    const message = event.data;
    result = await handleMessageImpl(message);
  } catch (e) {
    error = e instanceof Error ? e : new Error(String(e));
  }
  const syncTrait = event.data.isSync ? {
    lockBuffer: event.data.lockBuffer,
    resultBuffer: event.data.resultBuffer
  } : void 0;
  sendWorkerResult({
    id: event.data.id,
    result,
    error,
    syncTrait
  });
};
async function handleMessageImpl({
  type,
  data
}) {
  let result;
  switch (type) {
    case "backupDatabase": {
      await backupDatabase(
        data.destNativeDatabaseId,
        data.destDatabaseName,
        data.sourceNativeDatabaseId,
        data.sourceDatabaseName
      );
      break;
    }
    case "close": {
      await closeDatabase(data.nativeDatabaseId);
      break;
    }
    case "deleteDatabase": {
      await deleteDatabase(data.databasePath);
      break;
    }
    case "exec": {
      await exec(data.nativeDatabaseId, data.source);
      break;
    }
    case "finalize": {
      await finalize(data.nativeDatabaseId, data.nativeStatementId);
      break;
    }
    case "getAll": {
      result = await getAllRows(data.nativeDatabaseId, data.nativeStatementId);
      break;
    }
    case "getColumnNames": {
      result = await getColumnNames(data.nativeStatementId);
      break;
    }
    case "importAssetDatabase": {
      await importAssetDatabase(data.databasePath, data.assetDatabasePath, data.forceOverwrite);
      break;
    }
    case "isInTransaction": {
      result = await isInTransaction(data.nativeDatabaseId);
      break;
    }
    case "open": {
      await openDatabase(
        data.nativeDatabaseId,
        data.databasePath,
        new SQLiteOptions(data.options),
        data.serializedData
      );
      break;
    }
    case "prepare": {
      result = await prepare(data.nativeDatabaseId, data.nativeStatementId, data.source);
      break;
    }
    case "reset": {
      await reset(data.nativeDatabaseId, data.nativeStatementId);
      break;
    }
    case "run": {
      result = await run(
        data.nativeDatabaseId,
        data.nativeStatementId,
        data.bindParams,
        data.bindBlobParams,
        data.shouldPassAsArray
      );
      break;
    }
    case "serialize": {
      result = await serializeDatabase(data.nativeDatabaseId, data.schemaName);
      break;
    }
    case "step": {
      result = await step(data.nativeDatabaseId, data.nativeStatementId);
      break;
    }
    case "sessionCreate": {
      await sessionCreate(data.nativeDatabaseId, data.nativeSessionId, data.dbName);
      break;
    }
    case "sessionAttach": {
      await sessionAttach(data.nativeDatabaseId, data.nativeSessionId, data.table);
      break;
    }
    case "sessionEnable": {
      await sessionEnable(data.nativeDatabaseId, data.nativeSessionId, data.enabled);
      break;
    }
    case "sessionClose": {
      await sessionClose(data.nativeDatabaseId, data.nativeSessionId);
      break;
    }
    case "sessionCreateChangeset": {
      result = await sessionCreateChangeset(data.nativeDatabaseId, data.nativeSessionId);
      break;
    }
    case "sessionCreateInvertedChangeset": {
      result = await sessionCreateInvertedChangeset(data.nativeDatabaseId, data.nativeSessionId);
      break;
    }
    case "sessionApplyChangeset": {
      await sessionApplyChangeset(data.nativeDatabaseId, data.nativeSessionId, data.changeset);
      break;
    }
    case "sessionInvertChangeset": {
      result = await sessionInvertChangeset(
        data.nativeDatabaseId,
        data.nativeSessionId,
        data.changeset
      );
      break;
    }
    default: {
      throw new Error(`Unknown message type: ${type}`);
    }
  }
  return result;
}
async function backupDatabase(destNativeDatabaseId, destDatabaseName, sourceNativeDatabaseId, sourceDatabaseName) {
  const { sqlite3 } = await maybeInitAsync();
  const destDb = databaseIdMap.get(destNativeDatabaseId);
  if (!destDb) throw new Error(`Database not found - nativeDatabaseId[${destNativeDatabaseId}]`);
  const sourceDb = databaseIdMap.get(sourceNativeDatabaseId);
  if (!sourceDb)
    throw new Error(`Database not found - nativeDatabaseId[${sourceNativeDatabaseId}]`);
  await sqlite3.backup(destDb.pointer, destDatabaseName, sourceDb.pointer, sourceDatabaseName);
}
async function closeDatabase(nativeDatabaseId) {
  maybeFinalizeAllStatements(nativeDatabaseId);
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (dbEntity) {
    databaseIdMap.delete(nativeDatabaseId);
    await sqlite3.close(dbEntity.pointer);
  }
}
async function deleteDatabase(databasePath) {
  const { vfs } = await maybeInitAsync();
  if (databasePath !== ":memory:") {
    vfs.jDelete(
      databasePath,
      0
      /* unused arg for AccessHandlePoolVFS */
    );
  }
}
async function deserializeDatabase(sqlite3, serializedData) {
  const pointer = await sqlite3.open_v2(
    ":memory:",
    SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE,
    VFS_NAME_MEMORY
  );
  await sqlite3.deserialize(pointer, "main", serializedData);
  return pointer;
}
async function exec(nativeDatabaseId, source) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  await sqlite3.exec(dbEntity.pointer, source);
}
async function finalize(nativeDatabaseId, nativeStatementId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const stmt = statementIdMap.get(nativeStatementId);
  if (!stmt) throw new Error(`Statement not found - nativeStatementId[${nativeStatementId}]`);
  statementIdMap.delete(nativeStatementId);
  if (await sqlite3.finalize(stmt.pointer) !== SQLITE_OK) {
    throw new Error("Error finalizing statement");
  }
}
async function getAllRows(nativeDatabaseId, nativeStatementId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const stmt = statementIdMap.get(nativeStatementId);
  if (!stmt) throw new Error(`Statement not found - nativeStatementId[${nativeStatementId}]`);
  const rows = [];
  while (true) {
    const ret = await sqlite3.step(stmt.pointer);
    if (ret === SQLITE_ROW) {
      rows.push(getColumnValues(sqlite3, stmt.pointer));
      continue;
    } else if (ret === SQLITE_DONE) {
      break;
    }
    throw new Error("Error executing statement");
  }
  return rows;
}
async function getColumnNames(nativeStatementId) {
  const { sqlite3 } = await maybeInitAsync();
  const stmt = statementIdMap.get(nativeStatementId);
  if (!stmt) throw new Error(`Statement not found - nativeStatementId[${nativeStatementId}]`);
  const columnCount = sqlite3.column_count(stmt.pointer);
  const columnNames = [];
  for (let i = 0; i < columnCount; i++) {
    columnNames.push(sqlite3.column_name(stmt.pointer, i));
  }
  return columnNames;
}
async function importAssetDatabase(databasePath, assetDatabasePath, forceOverwrite) {
  const { sqlite3, vfs } = await maybeInitAsync();
  if (!forceOverwrite) {
    const buffer = new DataView(new ArrayBuffer(4));
    await vfs.jAccess(databasePath, 0, buffer);
    if (buffer.getUint8(0) === 1) {
      return;
    }
  }
  const response = await fetch(assetDatabasePath);
  if (!response.ok) {
    throw new Error(
      `[importAssetDatabaseAsync] Failed to fetch asset database: ${response.statusText}`
    );
  }
  const serializedData = new Uint8Array(await response.arrayBuffer());
  const srcDb = await sqlite3.open_v2(
    databasePath,
    SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE,
    VFS_NAME_PERSISTENT
  );
  await sqlite3.deserialize(srcDb, "main", serializedData);
  const destDb = await sqlite3.open_v2(databasePath);
  await sqlite3.backup(destDb, "main", srcDb, "main");
  await sqlite3.close(srcDb);
  await sqlite3.close(destDb);
}
async function isInTransaction(nativeDatabaseId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  return sqlite3.get_autocommit(dbEntity.pointer) === 0;
}
async function openDatabase(nativeDatabaseId, databasePath, options, serializedData) {
  const { sqlite3 } = await maybeInitAsync();
  let pointer;
  if (serializedData) {
    pointer = await deserializeDatabase(sqlite3, serializedData);
  } else {
    const dbEntity2 = findCachedDatabase(
      (entity) => entity.databasePath === databasePath && entity.openOptions.equals(options) && !options.useNewConnection
    );
    if (dbEntity2) {
      databaseIdMap.set(nativeDatabaseId, dbEntity2);
      await initDb(sqlite3, dbEntity2);
      return;
    }
    const flags = SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE;
    const vfsName = databasePath === ":memory:" ? VFS_NAME_MEMORY : VFS_NAME_PERSISTENT;
    pointer = await sqlite3.open_v2(databasePath, flags, vfsName);
  }
  const dbEntity = {
    pointer,
    databasePath,
    openOptions: options
  };
  databaseIdMap.set(nativeDatabaseId, dbEntity);
  await initDb(sqlite3, dbEntity);
}
async function prepare(nativeDatabaseId, nativeStatementId, source) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const asyncIterable = sqlite3.statements(dbEntity.pointer, source, { unscoped: true });
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  const { value: statementPointer } = await asyncIterator.next();
  asyncIterator.return?.();
  if (!statementPointer) throw new Error("Failed to prepare statement");
  statementIdMap.set(nativeStatementId, { pointer: statementPointer });
}
async function run(nativeDatabaseId, nativeStatementId, bindParams, bindBlobParams, shouldPassAsArray) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const stmt = statementIdMap.get(nativeStatementId);
  if (!stmt) throw new Error(`Statement not found - nativeStatementId[${nativeStatementId}]`);
  sqlite3.reset(stmt.pointer);
  sqlite3.clear_bindings(stmt.pointer);
  for (const [key, param] of Object.entries(bindParams)) {
    const index = getBindParamIndex(sqlite3, stmt.pointer, key, shouldPassAsArray);
    if (index > 0) {
      bindStatementParam(sqlite3, stmt.pointer, param, index);
    }
  }
  for (const [key, param] of Object.entries(bindBlobParams)) {
    const index = getBindParamIndex(sqlite3, stmt.pointer, key, shouldPassAsArray);
    if (index > 0) {
      bindStatementParam(sqlite3, stmt.pointer, param, index);
    }
  }
  const ret = await sqlite3.step(stmt.pointer);
  if (ret !== SQLITE_ROW && ret !== SQLITE_DONE) {
    throw new SQLiteErrorException("Error executing statement");
  }
  const firstRowValues = ret === SQLITE_ROW ? getColumnValues(sqlite3, stmt.pointer) : [];
  return {
    lastInsertRowId: Number(sqlite3.last_insert_rowid(dbEntity.pointer)),
    changes: sqlite3.changes(dbEntity.pointer),
    firstRowValues
  };
}
async function reset(nativeDatabaseId, nativeStatementId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const stmt = statementIdMap.get(nativeStatementId);
  if (!stmt) throw new Error(`Statement not found - nativeStatementId[${nativeStatementId}]`);
  if (await sqlite3.reset(stmt.pointer) !== SQLITE_OK) {
    throw new Error("Error resetting statement");
  }
}
async function serializeDatabase(nativeDatabaseId, schemaName) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  return sqlite3.serialize(dbEntity.pointer, schemaName);
}
async function step(nativeDatabaseId, nativeStatementId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const stmt = statementIdMap.get(nativeStatementId);
  if (!stmt) throw new Error(`Statement not found - nativeStatementId[${nativeStatementId}]`);
  const ret = await sqlite3.step(stmt.pointer);
  if (ret === SQLITE_ROW) {
    return getColumnValues(sqlite3, stmt.pointer);
  }
  if (ret !== SQLITE_DONE) {
    throw new Error("Error executing statement");
  }
  return null;
}
async function sessionCreate(nativeDatabaseId, nativeSessionId, dbName) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const session = sqlite3.session_create(dbEntity.pointer, dbName);
  sessionIdMap.set(nativeSessionId, { pointer: session });
}
async function sessionAttach(nativeDatabaseId, nativeSessionId, table) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const session = sessionIdMap.get(nativeSessionId);
  if (!session) throw new Error(`Session not found - nativeSessionId[${nativeSessionId}]`);
  sqlite3.session_attach(session.pointer, table);
}
async function sessionEnable(nativeDatabaseId, nativeSessionId, enabled) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const session = sessionIdMap.get(nativeSessionId);
  if (!session) throw new Error(`Session not found - nativeSessionId[${nativeSessionId}]`);
  sqlite3.session_enable(session.pointer, enabled);
}
async function sessionClose(nativeDatabaseId, nativeSessionId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const session = sessionIdMap.get(nativeSessionId);
  if (!session) throw new Error(`Session not found - nativeSessionId[${nativeSessionId}]`);
  sessionIdMap.delete(nativeSessionId);
  sqlite3.session_delete(session.pointer);
}
async function sessionCreateChangeset(nativeDatabaseId, nativeSessionId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const session = sessionIdMap.get(nativeSessionId);
  if (!session) throw new Error(`Session not found - nativeSessionId[${nativeSessionId}]`);
  return sqlite3.session_changeset(session.pointer);
}
async function sessionCreateInvertedChangeset(nativeDatabaseId, nativeSessionId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  const session = sessionIdMap.get(nativeSessionId);
  if (!session) throw new Error(`Session not found - nativeSessionId[${nativeSessionId}]`);
  return sqlite3.session_changeset_inverted(session.pointer);
}
async function sessionApplyChangeset(nativeDatabaseId, nativeSessionId, changeset) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  sqlite3.changeset_apply(dbEntity.pointer, changeset);
}
async function sessionInvertChangeset(nativeDatabaseId, nativeSessionId, changeset) {
  const { sqlite3 } = await maybeInitAsync();
  return sqlite3.changeset_invert(changeset);
}
function addUpdateHook(sqlite3, dbEntity) {
  sqlite3.update_hook(
    dbEntity.pointer,
    (updateType, dbName, tblName, rowId) => {
      const message = {
        type: "onDatabaseChange",
        data: {
          databaseName: dbName,
          databaseFilePath: sqlite3.db_filename(dbEntity.pointer, dbName ?? "main"),
          tableName: tblName,
          rowId: Number.isSafeInteger(rowId) ? rowId : Number(rowId),
          typeId: createSQLAction(updateType)
        }
      };
      self.postMessage(message);
    }
  );
}
function bindStatementParam(sqlite3, stmt, param, index) {
  if (param == null) {
    sqlite3.bind_null(stmt, index);
  } else if (typeof param === "number") {
    if (Number.isInteger(param)) {
      if (param > MAX_INT32 || param < MIN_INT32) {
        sqlite3.bind_int64(stmt, index, BigInt(param));
      } else {
        sqlite3.bind_int(stmt, index, param);
      }
    } else {
      sqlite3.bind_double(stmt, index, param);
    }
  } else if (typeof param === "string") {
    sqlite3.bind_text(stmt, index, param);
  } else if (param instanceof Uint8Array) {
    sqlite3.bind_blob(stmt, index, param);
  } else if (typeof param === "boolean") {
    sqlite3.bind_int(stmt, index, param ? 1 : 0);
  } else {
    throw new Error(`Unsupported parameter type: ${typeof param}`);
  }
}
function findCachedDatabase(predicate) {
  for (const entity of databaseIdMap.values()) {
    if (predicate(entity)) {
      return entity;
    }
  }
  return null;
}
function getBindParamIndex(sqlite3, stmt, key, shouldPassAsArray) {
  let index;
  if (shouldPassAsArray) {
    const intKey = parseInt(key, 10);
    if (isNaN(intKey)) {
      throw new Error("Invalid bind parameter");
    }
    index = intKey + 1;
  } else {
    index = sqlite3.bind_parameter_index(stmt, key);
  }
  return index;
}
function getColumnValue(sqlite3, stmt, index) {
  const type = sqlite3.column_type(stmt, index);
  let value;
  switch (type) {
    case SQLITE_INTEGER: {
      value = sqlite3.column_int_safe(stmt, index);
      break;
    }
    case SQLITE_FLOAT: {
      value = sqlite3.column_double(stmt, index);
      break;
    }
    case SQLITE_TEXT: {
      value = sqlite3.column_text(stmt, index);
      break;
    }
    case SQLITE_BLOB: {
      value = sqlite3.column_blob(stmt, index);
      break;
    }
    case SQLITE_NULL: {
      value = null;
      break;
    }
    default: {
      throw new Error(`Unsupported column type: ${type}`);
    }
  }
  return value;
}
function getColumnValues(sqlite3, stmt) {
  const columnCount = sqlite3.column_count(stmt);
  const columnValues = [];
  for (let i = 0; i < columnCount; i++) {
    columnValues[i] = getColumnValue(sqlite3, stmt, i);
  }
  return columnValues;
}
async function initDb(sqlite3, dbEntity) {
  if (dbEntity.openOptions.enableChangeListener) {
    addUpdateHook(sqlite3, dbEntity);
  }
}
async function maybeFinalizeAllStatements(nativeDatabaseId) {
  const { sqlite3 } = await maybeInitAsync();
  const dbEntity = databaseIdMap.get(nativeDatabaseId);
  if (!dbEntity) throw new Error(`Database not found - nativeDatabaseId[${nativeDatabaseId}]`);
  if (!dbEntity.openOptions.finalizeUnusedStatementsBeforeClosing) {
    return;
  }
  let error = null;
  const finalizedStatements = [];
  let stmt = sqlite3.next_stmt(dbEntity.pointer, null);
  while (stmt != null && stmt !== 0) {
    const nextStmt = sqlite3.next_stmt(dbEntity.pointer, stmt);
    try {
      sqlite3.finalize(stmt);
      finalizedStatements.push(stmt);
    } catch (e) {
      error = e;
    }
    stmt = nextStmt;
  }
  const statementsToDelete = [];
  for (const [nativeStatementId, stmtEntity] of statementIdMap.entries()) {
    if (finalizedStatements.includes(stmtEntity.pointer)) {
      statementsToDelete.push(nativeStatementId);
    }
  }
  for (const nativeStatementId of statementsToDelete) {
    statementIdMap.delete(nativeStatementId);
  }
  if (error) throw error;
}
async function maybeInitAsync() {
  if (!_sqlite3) {
    const module = await (0, import_wa_sqlite.default)({
      locateFile: () => wa_sqlite_default
    });
    _sqlite3 = Factory(module);
    if (!_sqlite3) {
      throw new Error("Failed to initialize wa-sqlite");
    }
    if (_vfs == null) {
      _vfs = await AccessHandlePoolVFS.create(VFS_NAME_PERSISTENT, module);
      if (_vfs == null) {
        throw new Error("Failed to initialize AccessHandlePoolVFS");
      }
    }
    _sqlite3.vfs_register(_vfs, true);
    if (_vfsMemory == null) {
      _vfsMemory = await MemoryVFS.create(VFS_NAME_MEMORY, module);
      if (_vfsMemory == null) {
        throw new Error("Failed to initialize MemoryVFS");
      }
    }
    _sqlite3.vfs_register(_vfsMemory, false);
  }
  if (_vfs == null || _vfsMemory == null) {
    throw new Error("Invalid VFS state");
  }
  return { sqlite3: _sqlite3, vfs: _vfs, vfsMemory: _vfsMemory };
}
