//M3meScript0.1
function lexer(program){
  let stream = "";
  let tokens = [];
  let comment = alerting = functions = forinit = forloop = farguments = variables = fparameters = fcall = false;
  function removeNewLine(s){
    return s.split('').splice(-s.length,s.length - 1).join('');
  }
  function removeWhiteSpace(s){
    return s.replace(' ', '');
  }
  //remove first white space
  function rfws(s){
    return s.split('').splice(1,s.length - 1).join('');
  }
  program.split('').forEach(x => {
    stream += x;
    
    // Comments //
    if(stream == "M3mes"){
      tokens.push("COMMENT");
      stream = "";
      comment = true;
    }
    
    // Alert //
    if(stream == "WOW "){
      tokens.push("ALERT");
      stream = "";
      alerting = true;
    }
    
    // Function //
    if(stream == "DoIt "){
      tokens.push("FUNCTION");
      stream = "";
      functions = true;
    }
    
    // End Block //
    if(stream == "<~"){
      if(forloop === true){
        tokens.push("ENDFOR");
        forloop = false;
      } else if(functions === true){
        tokens.push("ENDFUNCTION");
        functions = false;
      }
      stream = "";
    }
    
    // Function name and Variables //
    if(stream.indexOf("~>") != -1){
      if(fcall === true){
        // arguments
        tokens.push(removeWhiteSpace(stream.split('~>').join('')));
        tokens.push("FARG");
        stream = "";
        farguments = true;
        fcall === false;
      } else if(forloop === true){
        tokens.push(removeWhiteSpace(stream.split('~>').join('')));
        tokens.push("ENDFORINIT");
        stream = "";
        forinit = false;
      } else {
        // parameters
        tokens.push(removeWhiteSpace(stream.split('~>').join('')));
        tokens.push("FPARM");
        stream = "";
        fparameters = true;
      }
    }
    
    // Function call //
    if(stream == "JustDoIt"){
      tokens.push('FCALL');
      stream = "";
      fcall = true;
    }
    
    // Indent //
    if(functions === true || forloop === true) {
      if(stream == ' ') stream = '';
    }
    
    // Variable keyword //
    if(stream == "hot chicken trust fund" || stream == "hctf"){
      tokens.push("VAR");
      stream = "";
      variables = true;
    }
    
    // Equals //
    if(stream.indexOf("is") != -1){
      tokens.push(removeWhiteSpace(stream.split('is').join('')));
      tokens.push("EQUALS");
      stream = "";
    }
    
    // For loop
    if(stream == "AnothaOne"){
      tokens.push("FOR");
      stream = "";
      forloop = true;
    }
    
    
    // New line //
    if(stream.indexOf("\n") != -1){
      if(comment === true){
        tokens.push(stream);
        stream = "";
        comment = false;
      } else if(alerting === true){
        tokens.push(removeNewLine(stream));
        tokens.push('ENDALERT');
        stream = "";
        alerting = false;
      } else if(fparameters === true){
        tokens.push(removeWhiteSpace(removeNewLine(stream)).split(','));
        tokens.push('ENDFPARM');
        stream = "";
        fparameters = false;
      } else if(farguments === true){
        tokens.push(removeWhiteSpace(removeNewLine(stream)).split(','));
        tokens.push('ENDFARG');
        stream = "";
        fparameters = false;
      } else if(fcall === true){
        tokens.push(removeWhiteSpace(stream.replace('\n','')));
        tokens.push('ENDFCALL');
        stream = "";
        fcall = false;
      } else if(variables === true){
        tokens.push(stream.replace('\n',''));
        tokens.push('ENDVAR');
        
        stream = "";
        variables = false;
      } else if(forloop === true && forinit === true){
        tokens.push(stream.replace(/~>|\n/g,''));
        tokens.push('ENDFORINIT');
        stream = "";
      }
      
      else {
        tokens.push('NEWLINE');
      }
      stream = "";
    } 
  });
  //console.log(tokens);
  return parser(tokens);
}

function parser(tokens){
  let tokensToJS = {
    'COMMENT': '//',
    'ALERT': 'alert(',
    'ENDALERT': ');\n',
    'FUNCTION': 'function ',
    'ENDFUNCTION': '}',
    'FCALL': '',
    'FOR': 'for(var i = 0; i <',
    'ENDFORINIT': ';i++){',
    'ENDFOR': '}',
    'ENDFCALL': '();\n',
    'FARG': '(',
    'FPARM': '(',
    'ENDFPARM': '){\n',
    'ENDFARG': ');',
    'NEWLINE': '\n',
    'VAR': 'var ',
    'EQUALS': '=',
    'ENDVAR': ';\n'
  }
  tokens = tokens.map(x => {
    if(x in tokensToJS){
      return tokensToJS[x];
    }
    return x;
  })
  return tokens.join('')
}
