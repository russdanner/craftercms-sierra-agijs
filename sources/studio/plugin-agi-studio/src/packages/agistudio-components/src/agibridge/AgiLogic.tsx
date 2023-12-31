import AgiActiveGame from './AgiActiveGame';

export class AgiLogic {
  static testFunctions = [
    'equaln',
    'equalv',
    'lessn',
    'lessv',
    'greatern',
    'greaterv',
    'isset',
    'issetv',
    'has',
    'obj_in_room',
    'posn',
    'controller',
    'have_key',
    'said',
    'compare_strings',
    'obj_in_box',
    'center_posn',
    'right_posn'
  ];

  static statementFunctions = [
    'return',
    'increment',
    'decrement',
    'assignn',
    'assignv',
    'addn',
    'addv',
    'subn',
    'subv',
    'lindirectv',
    'rindirect',
    'lindirectn',
    'set',
    'reset',
    'toggle',
    'set_v',
    'reset_v',
    'toggle_v',
    'new_room',
    'new_room_v',
    'load_logic',
    'load_logic_v',
    'call',
    'call_v',
    'load_pic',
    'draw_pic',
    'show_pic',
    'discard_pic',
    'overlay_pic',
    'show_pri_screen',
    'load_view',
    'load_view_v',
    'discard_view',
    'animate_obj',
    'unanimate_all',
    'draw',
    'erase',
    'position',
    'position_v',
    'get_posn',
    'reposition',
    'set_view',
    'set_view_v',
    'set_loop',
    'set_loop_v',
    'fix_loop',
    'release_loop',
    'set_cel',
    'set_cel_v',
    'last_cel',
    'current_cel',
    'current_loop',
    'current_view',
    'number_of_loops',
    'set_priority',
    'set_priority_v',
    'release_priority',
    'get_priority',
    'stop_update',
    'start_update',
    'force_update',
    'ignore_horizon',
    'observe_horizon',
    'set_horizon',
    'object_on_water',
    'object_on_land',
    'object_on_anything',
    'ignore_objs',
    'observe_objs',
    'distance',
    'stop_cycling',
    'start_cycling',
    'normal_cycle',
    'end_of_loop',
    'reverse_cycle',
    'reverse_loop',
    'cycle_time',
    'stop_motion',
    'start_motion',
    'step_size',
    'step_time',
    'move_obj',
    'move_obj_v',
    'follow_ego',
    'wander',
    'normal_motion',
    'set_dir',
    'get_dir',
    'ignore_blocks',
    'observe_blocks',
    'block',
    'unblock',
    'get',
    'get_v',
    'drop',
    'put',
    'put_v',
    'get_room_v',
    'load_sound',
    'sound',
    'stop_sound',
    'print',
    'print_v',
    'display',
    'display_v',
    'clear_lines',
    'text_screen',
    'graphics',
    'set_cursor_char',
    'set_text_attribute',
    'shake_screen',
    'configure_screen',
    'status_line_on',
    'status_line_off',
    'set_string',
    'get_string',
    'word_to_string',
    'parse',
    'get_num',
    'prevent_input',
    'accept_input',
    'set_key',
    'add_to_pic',
    'add_to_pic_v',
    'status',
    'save_game',
    'restore_game',
    'init_disk',
    'restart_game',
    'show_obj',
    'random',
    'program_control',
    'player_control',
    'obj_status_v',
    'quit',
    'show_mem',
    'pause',
    'echo_line',
    'cancel_line',
    'init_joy',
    'toggle_monitor',
    'version',
    'script_size',
    'set_game_id',
    'log',
    'set_scan_start',
    'reset_scan_start',
    'reposition_to',
    'reposition_to_v',
    'trace_on',
    'trace_info',
    'print_at',
    'print_at_v',
    'discard_view_v',
    'clear_text_rect',
    'set_upper_left',
    'set_menu',
    'set_menu_member',
    'submit_menu',
    'enable_member',
    'disable_member',
    'menu_input',
    'show_obj_v',
    'open_dialogue',
    'close_dialogue',
    'mul_n',
    'mul_v',
    'div_n',
    'div_v',
    'close_window',
    'set_simple',
    'push_script',
    'pop_script',
    'hold_key',
    'set_pri_base',
    'discard_sound',
    'hide_mouse',
    'allow_menu',
    'show_mouse',
    'fence_mouse',
    'mouse_posn',
    'release_key',
    'adj_ego_move_to_xy'
  ];

  static prettyPrintCode = (lines: any) => {
    var code = '';
    lines.forEach(function (line) {
      if (line == '{') {
        code += ' ';
      } else {
        code += '\n';
      }

      code += line;
    });

    return code;
  };

  static newLogicFromBuffer = (buffer: any) => {
    let Agi = AgiActiveGame.agiExecute('Get Agi', 'Agi');

    // load room 1 logic and manipulate it into a "new" logic
    let logic = new Agi.LogicParser(Agi.interpreter, 1);

    let Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
    let bStreamBuffer = new Fs.ByteStream(buffer, 0);
    logic.logic.data = buffer; //bStreamBuffer

    logic.messages = [];
    logic.logic.messages = [];
    logic.messagesStartOffset = buffer.buffer[1];
    logic.logic.data.position = 0;

    // create the message array
    var numMessages = buffer.buffer[logic.messagesStartOffset];
    var ptrMessagesEnd = buffer.buffer[logic.messagesStartOffset + 1];
    var decryptionIndex = 0;
    for (var i = 0; i < numMessages; i++) {
      var msgPtr = buffer.buffer[logic.messagesStartOffset + 2 + i];
      var msgByte = -1;
      var msg = '';
      var msgByteIdx = 0;
      while (msgByte != 0) {
        msgByte = buffer.buffer[msgPtr + msgByteIdx++];
        if (msgByte != 0) msg += String.fromCharCode(msgByte);
      }
      logic.logic.messages[logic.logic.messages.length] = msg;
      logic.messages[logic.messages.length] = msg;
    }

    logic.decompile();

    return logic;
  };

  static decompile = (binary: any, logic: any) => {
    var lines = [];
    if (logic) {
      var program = logic.decompile();
      AgiLogic.decompileScope(binary, logic.logic.messages, program, lines, 0);

      var m = 1;
      logic.logic.messages.forEach(function (msg) {
        lines.push('#message ' + m + ' "' + msg + '"');
        m++;
      });
    }

    return lines;
  };

  static decompileScope = (binary: any, messages: any, scope: any, lines: any, depth: number) => {
    scope.body.forEach(function (node: any) {
      lines.push('\t'.repeat(depth) + AgiLogic.decompileNode(binary, messages, node));

      if (node.then) {
        lines.push('{');
        AgiLogic.decompileScope(binary, messages, node.then, lines, depth + 1);
        lines.push('\t'.repeat(depth) + '}');
      }
      if (node.else) {
        lines.push('\t'.repeat(depth) + 'else {');
        AgiLogic.decompileScope(binary, messages, node.else, lines, depth + 1);
        lines.push('\t'.repeat(depth) + '}');
      }
    });

    return lines;
  };

  static decompileExpression = (expression: any) => {
    var line = '';
    var opCode = expression.opcode;
    var args = expression.args;
    var negate = expression.negate;
    var right = expression.right;
    var left = expression.left;

    //} else if (opCode == 0xfd) { //line += '!';

    if (left && right) {
      line += AgiLogic.decompileExpression(left);
      line += left.constructor.name == 'AndNode' ? ' && ' : ' || ';
      line += AgiLogic.decompileExpression(right);
    } else {
      var funcName = AgiLogic.testFunctions[opCode - 1];
      line = (negate ? '!' : '') + funcName + '(';

      if (opCode === 13) {
        line += expression.byteOffset;
      } else {
        if (args) {
          var testVars = AgiLogic.processArgNames(funcName, true, args, []);

          for (var a = 0; a < testVars.length; a++) {
            var arg = testVars[a];
            if (a > 0) line += ', ';
            line += arg;
          }
        }
      }
      line += ')';
    }

    return line;
  };

  static processArgNames = (funcName, isTest, args, messages) => {
    var values = [];

    for (var i = 0; i < args.length; i++) {
      var value = args[i];

      if (i == 0) {
        if (isTest == true) {
          if (funcName.startsWith('isset')) value = 'f' + value;
          else value = 'v' + value;
        } else {
          if (funcName === 'print') value = '"' + messages[parseInt(value) - 1] + '"';
          else if (funcName.startsWith('set_menu')) value = '"' + messages[parseInt(value) - 1] + '"';
          else if (funcName.startsWith('set')) value = 'f' + value;
          else if (funcName.startsWith('assign')) value = 'v' + value;
        }
      } else {
        if (!isTest) {
          if (!funcName.startsWith('assign')) {
            if (funcName.endsWith('v')) value = 'v' + value;
            else if (funcName == 'set_menu_member') value = 'c' + value;
          }
        }
      }

      values.push(value);
    }

    return values;
  };

  static decompileNode = (binary: any, messages: any, node: any) => {
    var line = '';
    var opCode = node.opcode;

    var byteOffset = node.byteOffset; // ast node
    var statement = node.statement; // statement
    var args = node.args; // test and statement
    var expression = node.expression; // if

    if (opCode == 0x00) {
      line = 'return;';
    } else if (opCode == 0xff) {
      line = 'if(';
      line += AgiLogic.decompileExpression(expression);
      line += ')';
    } else if (opCode == 0xfe) {
      if (node.expression) {
        line = 'else (';
        line += AgiLogic.decompileExpression(expression);
        line += ')';
      } else {
        line += 'goto';
      }
    } else if (opCode == 0x0e) {
      line = 'said';
      // this does not seem to get called because
      // it's getting addressed in the if logic
    } else {
      var funcName = AgiLogic.statementFunctions[opCode];
      line += funcName;

      line += '(';
      if (args) {
        line += args;
      } else {
        var statementArgs = [];
        for (var i = 0; i < statement.length; i++) {
          statementArgs.push(AgiLogic.getValueAtOffset(binary, byteOffset - statement.length + i));
        }

        var statementArgsx = AgiLogic.processArgNames(funcName, false, statementArgs, messages);

        for (var a = 0; a < statementArgsx.length; a++) {
          var arg = statementArgsx[a];
          if (a > 0) line += ', ';
          line += arg;
        }
      }

      line += ');';
    }

    return line;
  };

  static getValueAtOffset = (binary: any, offset: number) => {
    binary.position = offset;
    return binary.readUint8();
  };

  static prepareCodeForCompile = (logicCode, include) => {
    logicCode - logicCode.replace('#include "0-defines.aqi"', include);
    logicCode = logicCode.replaceAll('\t', '');

    let finalLines = [];
    let lines = logicCode.split(/\r?\n/);

    for (var i = 0; i < lines.length; i++) {
      var codeLine = lines[i];
      codeLine = codeLine.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, '');

      if (!codeLine.startsWith('//') && !codeLine.startsWith('#') && codeLine != '') {
        finalLines.push(codeLine);
      }
    }

    return finalLines;
  };

  static prepareMessageTableForCompile = (logicCode) => {
    let messageTable = [];
    let messageTableStr = logicCode;
    let lines = logicCode.split(/\r?\n/);
    lines.forEach(function (lineToParse) {
      if (lineToParse.indexOf('#message') != -1 || lineToParse.indexOf('print(') != -1) {
        let msg = lineToParse.substring(lineToParse.indexOf('"'), lineToParse.lastIndexOf('"') + 1).replaceAll('"', '');
        messageTable[messageTable.length] = msg;
      }
    });

    return messageTable;
  };

  static prepareDefineTableForCompile = (logicCode, include) => {
    let defineMap = [];
    let defineTableStr = include + '\n' + logicCode;
    let defineLines = defineTableStr.split(/\r?\n/);

    defineLines.forEach(function (lineToParse) {
      if (lineToParse.indexOf('#define') != -1) {
        let defineLine = lineToParse.replaceAll('#define ', '');
        let defineParts = defineLine.split(' ');
        defineMap[defineParts[0]] = defineParts[1];
      }
    });

    return defineMap;
  };

  static lookupSaidWordId(word, words) {
    let wordId = 1;

    word = word.substring(word.indexOf('"'), word.lastIndexOf('"') + 1).replaceAll('"', '');

    let wordKeys = Object.keys(words);

    wordKeys.forEach(function (wordKey) {
      var wordArray = words[wordKey];
      if (wordArray && wordArray.indexOf(word) != -1) {
        wordId = parseInt(wordKey);
      }
    });

    return wordId;
  }

  static encodeLogic = (lines, buffer, position, messageTable, defineMap, words) => {
    let scopeStack = [];

    lines.forEach(function (line) {
      var lineToParse = line;
      lineToParse = lineToParse.replaceAll('\t', '');
      var command = '';

      try {
        if (lineToParse.indexOf('(') != -1) {
          // function or if statement
          command = lineToParse.substring(0, lineToParse.indexOf('('));
          command = command.toLowerCase();
        } else {
          // other
          command = lineToParse;
        }

        let opCode = -1;
        let args = [];

        if (command === 'return') {
          opCode = 0x00;
        } else if (command === 'if') {
         //console.log('DOING AN IF');

          opCode = 0xff;
          let testStr = lineToParse.replace('if(', '').replace('){', '');
          let testStrArray = testStr.split(/\|\||\&\&/);

          testStrArray.forEach(function (testStr) {
            // 0xFC OR
            // 0xFD AND
            // NEGATED?
            let negated = false;
            let compareCommand = testStr.substring(0, testStr.indexOf('('));

            if (compareCommand.substring(0, 1) == '!') {
              negated = true;
              compareCommand = compareCommand.substring(1);
              args[args.length] = 0xfd; // negated
            }

            var compOpCode = AgiLogic.testFunctions.indexOf(compareCommand.replaceAll('.', '_')) + 1;
            let compareArgsStr = testStr.substring(testStr.indexOf('(') + 1, testStr.indexOf(')'));
            let compareArgs = compareArgsStr.split(',');

            if (compOpCode === 14) {
              // Said is treated differently because its args are are variable and 16-byte
              args[args.length] = 14; //0x0e; // op code for said
              args[args.length] = compareArgs.length; // number of params

              compareArgs.forEach(function (arg) {
                let wordId = AgiLogic.lookupSaidWordId(arg, words);
                args[args.length] = wordId & (0xffff >> 8); // hi param
                args[args.length] = wordId >> 8; // lo param
              });
            } else {
              args[args.length] = compOpCode;

              compareArgs.forEach(function (arg) {
                let defineHit = defineMap[arg];
                let argAsNum = defineHit ? parseInt(defineHit) : parseInt(arg);

                if(arg != "") {
                  if (isNaN(argAsNum)) {
                    alert("Build failed due to bad symbol: '" + arg + "'");
                    throw new DOMException("Build failed due to bad symbol: '" + arg + "'");
                  } else {
                    args[args.length] = isNaN(argAsNum) ? arg : argAsNum;
                  }  
                }
              });
            }
          });
          args[args.length] = 0xff; // close the if clause if(....)
          args[args.length] = 0x00; // length of scope
          args[args.length] = 0x00; // length of scope

          scopeStack.push(position + 1 + args.length);
        } else if (lineToParse.indexOf('else{') != -1) {
          opCode = 0xfe;
          // else increases the if open scope by 3 bytes
          scopeStack[scopeStack.length - 1] += 3;

          // now open the next scope
          args[args.length] = 0x00; // length of scope
          args[args.length] = 0x00; // length of scope
          scopeStack.push(position + 1);
         //console.log('DOING ELSE');
        } else if (command === '}') {
          // close of scope, nothng to do
          let curOpenScopePosition = scopeStack.pop();

          let byteCount = position - curOpenScopePosition;
          buffer[curOpenScopePosition - 2] = byteCount;
          //console.log('CLOSING A SCOPE');
        } else if (command.indexOf('#message') != -1) {
          // messages and defines handled before this processing
        } else {
          opCode = AgiLogic.statementFunctions.indexOf(command.replaceAll('.', '_'));
          let argsStr = lineToParse.replaceAll(command, '');
          argsStr = argsStr.replace('(', '').replace(')', '');
          args = argsStr != '' ? argsStr.split(',') : [];

          // convert argments that are strings to ID in message tabel
          let argIdx = 0;
          args.forEach(function (arg) {
            if (arg.indexOf('"') != -1) {
              let msg = arg.replaceAll('"', '');
              let msgId = messageTable.indexOf(msg) + 1;

              if (msgId != -1) {
                args[argIdx++] = msgId;
              }
            } else {
              let defineHit = defineMap[arg];
              let argAsNum = defineHit ? parseInt(defineHit) : parseInt(arg);

              if (isNaN(argAsNum)) {
                alert("Build failed due to bad symbol: '" + arg + "'");
                throw new DOMException("Build failed due to bad symbol: '" + arg + "'");
              } else {
                args[argIdx++] = isNaN(argAsNum) ? arg : argAsNum;
              }
            }
          });
        }

        if (opCode != -1) {
          buffer[position] = opCode;
          position++;
          args.forEach(function (arg) {
            buffer[position] = arg;
            position++;
          });
          //console.log('opcode :' + command + ' => ' + opCode + ' | ' + args);
        }
      } catch (err) {
        console.log('err parsing command :' + line + ' => ' + command);
      }
    });

    return position;
  };

  static compile = (logicCode, words, include) => {
    // for now, no need to support multiple includes
    // prepare code
    var lines = AgiLogic.prepareCodeForCompile(logicCode, include);
    var messageTable = AgiLogic.prepareMessageTableForCompile(logicCode);
    var defineMap = AgiLogic.prepareDefineTableForCompile(logicCode, include);

    let buffer = new Uint8Array(80000);
    let position = 0;

    // Encode messages
    position = AgiLogic.encodeLogic(lines, buffer, position, messageTable, defineMap, words);

    // create a final buffer of the correct size and populate it
    let rightSizedBuffer = new Uint8Array(position);
    for (let i = 0; i < position; i++) {
      rightSizedBuffer[i] = buffer[i];
    }

    let Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
    let bStreamBuffer = new Fs.ByteStream(rightSizedBuffer, 0);
    return bStreamBuffer;
  };

  static encodeMessages = (logicCode, startPos) => {
    // Byte  Meaning
    // ----- -----------------------------------------------------------
    //   0   Number of messages
    //  1-2  Pointer to end of messages
    //  3-4  A list of offsets which point to each of the messages. The
    //       first offset naturally enough points to the start of the
    //       textual data
    //  ...
    //   ?   Start of the text data. From this point the messages are
    //       encrypted with Avis Durgan (in their unencrypted form, each
    //       message is separated by a 0x00 value)
    // ----- -----------------------------------------------------------

    var messageTable = AgiLogic.prepareMessageTableForCompile(logicCode);

    let decryptionKey = 'Avis Durgan';

    let position = 0;
    let buffer = new Uint8Array(8000);
    buffer[position++] = messageTable.length;
    buffer[position++] = 0;
    buffer[position++] = 0;

    let messageOffsetSectionStartPos = position; // capture where message pointer table begins
    position += 2 * messageTable.length; // make space for message pointres

    // now add the messages to the buffer
    let decryptionIndex = 0;
    for (var k = 0; k < messageTable.length; k++) {
      let message = messageTable[k];
      let mssageStartPos = position - 1;
      buffer[messageOffsetSectionStartPos + k * 2] = mssageStartPos & (0xffff >> 8); // message index lo
      buffer[messageOffsetSectionStartPos + k * 2 + 1] = mssageStartPos >> 8; // message index hi

      for (let j = 0; j < message.length; j++) {
        let encryptedChar = decryptionKey[decryptionIndex].charCodeAt(0) ^ message[j].charCodeAt(0);
        buffer[position++] = encryptedChar;
        decryptionIndex = decryptionIndex + 1;
        if (decryptionIndex == decryptionKey.length) {
          decryptionIndex = 0;
        }
      }
      buffer[position++] = decryptionKey[decryptionIndex].charCodeAt(0) ^ '\0'.charCodeAt(0); // mark the end of the message
      decryptionIndex = decryptionIndex + 1;
      if (decryptionIndex == decryptionKey.length) {
        decryptionIndex = 0;
      }
    }

    // note where message structure ends
    buffer[1] = position & (0xffff >> 8); // lo
    buffer[2] = position >> 8; // hi

    // create a final buffer of the correct size and populate it
    let rightSizedBuffer = new Uint8Array(position);
    for (let i = 0; i < position; i++) {
      rightSizedBuffer[i] = buffer[i];
    }

    let Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
    let bStreamBuffer = new Fs.ByteStream(rightSizedBuffer, 0);
    return bStreamBuffer;
  };

  static encodeWords = (data) => {
    let wordGroups = Object.keys(data);
    let wordsBuffer = new Uint8Array(10000);

    // Byte  Meaning
    // ----- -----------------------------------------------------------
    //  0-1  Hi and then Lo byte for 'A' offset
    //  ...
    // 50-51 Hi and then Lo byte for 'Z' offset
    //  52   Words section
    // ----- -----------------------------------------------------------
    let position = 52; // make room for index

    // Byte  Meaning
    // ----- -----------------------------------------------------------
    //   0   Number of characters to include from start of prevous word
    //   1   Char 1 (xor 0x7F gives the ASCII code for the character)
    //   2   Char 2
    //  ...
    //   n   Last char
    //  n+1  Wordnum (LO-HI) -- see below
    // ----- -----------------------------------------------------------
    wordGroups.forEach(function (wordKey) {
      var wordArray = data[wordKey];
      if (wordArray) {
        for (var i = 0; i < wordArray.length; i++) {
          let curWord = wordArray[i];
          wordsBuffer[position++] = 0;

          for (var j = 0; j < curWord.length; j++) {
            let curChar = curWord[j].charCodeAt(0);
            let encChar = curChar;

            if (j == curWord.length - 1) {
              encChar = (curChar + 128) ^ 127;
            } else {
              encChar = curChar ^ 127;
            }

            wordsBuffer[position++] = encChar;
          }

          let wordKeyNum = parseInt(wordKey);
          let wordKeyNumLE = wordKeyNum;
          wordsBuffer[position++] = wordKeyNumLE >> 8;
          wordsBuffer[position++] = wordKeyNumLE & (0xffff >> 8);
        }
      }
    });

    let rightSizedBuffer = new Uint8Array(position);
    for (let i = 0; i < position; i++) {
      rightSizedBuffer[i] = wordsBuffer[i];
    }

    return rightSizedBuffer;
  };

  static encodeObjects = (data) => {
    let wordGroups = Object.keys(data);
    let objectsBuffer = new Uint8Array(10000);
    let position = 0;

    // Byte  Meaning
    // ----- -----------------------------------------------------------
    //  0-1  Offset of the start of inventory item names
    //   2   Maximum number of animated objects
    // ----- -----------------------------------------------------------
    // Following the first three bytes as a section containing a three byte entry for each inventory
    // item all of which conform to the following format:
    let namesPos = data.objects.length * 3 + 3;

    objectsBuffer[position++] = namesPos >> 8;
    objectsBuffer[position++] = namesPos & (0xffff >> 8);
    objectsBuffer[position++] = 15;

    let decryptionIndex = 0;
    let decryptionKey = 'Avis Durgan';

    // Byte  Meaning
    // ----- -----------------------------------------------------------
    //  0-1  Offset of inventory item name i
    //   2   Starting room number for inventory item i or 255 carried
    // ----- -----------------------------------------------------------
    // where i is the entry number starting at 0. All offsets are taken from the start of entry for inventory item 0
    // (not the start of the file).
    // Then comes the textual names themselves. This is simply a list of NULL terminated strings.
    // The offsets mentioned in the above section point to the first character in the string and the last character is the
    // one before the 0x00.
    position = namesPos; // make room for header

    // now encode the names
    for (var i = 0; i < data.objects.length; i++) {
      let obj = data.objects[i];
      let offset = position;
      // console.log("Adding Inv object :"+obj.name)

      for (var j = 0; j < obj.name.length; j++) {

        let encryptedChar = decryptionKey[decryptionIndex++].charCodeAt(0) ^ obj.name[j].charCodeAt(0);
        objectsBuffer[position++] = encryptedChar;

        if (decryptionIndex == decryptionKey.length) {
          decryptionIndex = 0;
        }
      }
      objectsBuffer[position++] = '\0'.charCodeAt(0)

      // update header records
      // var recordPos = i * 3;
      // objectsBuffer[recordPos] = offset >> 8;
      // objectsBuffer[recordPos + 1] = offset & (0xffff >> 8);
      // objectsBuffer[recordPos + 2] = obj.startingRoom;
    }

    let rightSizedBuffer = new Uint8Array(position);
    for (let i = 0; i < position; i++) {
      rightSizedBuffer[i] = objectsBuffer[i];
    }

    return rightSizedBuffer;
  };
}
export default AgiLogic;
