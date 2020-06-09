// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var $$String = require("bs-platform/lib/js/string.js");
var Expect$KanComp = require("./Expect.bs.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

function $great$great$eq(a, f) {
  if (typeof a === "number" || a.tag) {
    return a;
  } else {
    return Curry._1(f, a[0]);
  }
}

function obtInfoFunAppl(esCurry) {
  return {
          valor: esCurry ? "Ñ" : "ñ",
          inicio: -1,
          final: -1,
          numLinea: -1,
          posInicioLinea: -1
        };
}

function obtInfoOp(operador) {
  switch (operador) {
    case "&&" :
        return /* tuple */[
                6,
                /* Izq */0
              ];
    case "," :
        return /* tuple */[
                1,
                /* Izq */0
              ];
    case "+" :
    case "-" :
        return /* tuple */[
                10,
                /* Izq */0
              ];
    case "%" :
    case "*" :
    case "/" :
        return /* tuple */[
                11,
                /* Izq */0
              ];
    case "!=" :
    case "!==" :
    case "==" :
    case "===" :
        return /* tuple */[
                8,
                /* Izq */0
              ];
    case "<" :
    case "<=" :
    case ">" :
    case ">=" :
        return /* tuple */[
                9,
                /* Izq */0
              ];
    case "<<" :
    case ">>" :
        return /* tuple */[
                4,
                /* Izq */0
              ];
    case "." :
    case "?." :
        return /* tuple */[
                15,
                /* Izq */0
              ];
    case "??" :
        return /* tuple */[
                7,
                /* Izq */0
              ];
    case "^" :
        return /* tuple */[
                12,
                /* Der */1
              ];
    case "%=" :
    case "*=" :
    case "+=" :
    case "-=" :
    case "/=" :
    case "=" :
    case "^=" :
        return /* tuple */[
                2,
                /* Izq */0
              ];
    case "<|" :
    case "|>" :
        return /* tuple */[
                3,
                /* Izq */0
              ];
    case "||" :
        return /* tuple */[
                5,
                /* Izq */0
              ];
    default:
      if (operador === "Ñ" || operador === "ñ") {
        return /* tuple */[
                14,
                /* Izq */0
              ];
      } else {
        return /* tuple */[
                13,
                /* Izq */0
              ];
      }
  }
}

function parseTokens(lexer) {
  var generarTextoError = function (info) {
    var largo = info.final - info.posInicioLinea | 0;
    var substr = $$String.sub(lexer.entrada, info.posInicioLinea, largo);
    var espBlanco = $$String.make(info.inicio - info.posInicioLinea | 0, /* " " */32);
    var indicador = $$String.make(info.final - info.inicio | 0, /* "~" */126);
    var numLinea = info.numLinea;
    var strIndicadorNumLinea = " " + (String(numLinea) + " | ");
    var espacioBlancoIndicador = $$String.make(strIndicadorNumLinea.length, /* " " */32);
    var strIndicador = "" + (String(espBlanco) + ("" + (String(indicador) + "")));
    return "" + (String(strIndicadorNumLinea) + ("" + (String(substr) + ("\n" + (String(espacioBlancoIndicador) + ("" + (String(strIndicador) + "\n")))))));
  };
  var sigExprDeclaracion = function (nivel, esMut) {
    try {
      var tokenIdentificador = Curry._1(lexer.sigToken, /* () */0);
      var infoTokenId = Expect$KanComp._TIdentificador(tokenIdentificador, undefined, "Se esperaba un identificador");
      Expect$KanComp._TOperador(Curry._1(lexer.sigToken, /* () */0), "=", "Se esperaba el operador de asignaci\xc3\xb3n '=' luego del indentificador.");
      var match = Curry._1(lexer.lookAheadSignificativo, false);
      var hayNuevaLinea = match[2];
      var nuevoNivel = match[1];
      if (hayNuevaLinea && nuevoNivel <= nivel) {
        throw [
              Expect$KanComp.ErrorComun,
              "La expresión actual está incompleta. Se esperaba una expresión indentada."
            ];
      }
      if (hayNuevaLinea) {
        Curry._1(match[3], /* () */0);
      }
      var match$1 = sigExpresion(nuevoNivel, nivel, true, 0, /* Izq */0, true);
      if (typeof match$1 === "number") {
        return /* PError */Block.__(1, ["Se esperaba una expresi\xc3\xb3n luego de la asignacion."]);
      } else if (match$1.tag) {
        return /* PError */Block.__(1, ["Se esperaba una expresión luego de la asignación: " + (String(match$1[0]) + "")]);
      } else {
        var exprDeclaracion = /* EDeclaracion */Block.__(7, [{
              mut: esMut,
              id: {
                signatura: /* Indefinida */0,
                valorId: infoTokenId
              },
              valorDec: match$1[0]
            }]);
        var exprRespuesta = /* PExito */Block.__(0, [exprDeclaracion]);
        var sigExpresionRaw = sigExpresion(nivel, nivel, true, 0, /* Izq */0, true);
        if (typeof sigExpresionRaw === "number") {
          return exprRespuesta;
        } else if (sigExpresionRaw.tag) {
          return /* PError */Block.__(1, [sigExpresionRaw[0]]);
        } else {
          var nuevaExpr = sigExpresionRaw[0];
          if (nuevaExpr.tag === /* EBloque */8) {
            return /* PExito */Block.__(0, [/* EBloque */Block.__(8, [/* :: */[
                            exprDeclaracion,
                            nuevaExpr[0]
                          ]])]);
          } else {
            return /* PExito */Block.__(0, [/* EBloque */Block.__(8, [/* :: */[
                            exprDeclaracion,
                            /* :: */[
                              nuevaExpr,
                              /* [] */0
                            ]
                          ]])]);
          }
        }
      }
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn[0] === Expect$KanComp.ErrorComun) {
        return /* PError */Block.__(1, [exn[1]]);
      } else {
        throw exn;
      }
    }
  };
  var sigExprOperador = function (exprIzq, infoOp, nivel, precedencia, asociatividad, esExprPrincipal) {
    var valorOp = infoOp.valor;
    var match = obtInfoOp(valorOp);
    var asocOp1 = match[1];
    var precOp1 = match[0];
    var match$1 = sigExpresion(nivel, nivel, false, precOp1, asocOp1, false);
    if (typeof match$1 === "number") {
      match$1 === /* PEOF */0;
    } else if (match$1.tag) {
      return /* PError */Block.__(1, ["Se esperaba una expresion a la derecha del operador " + (String(valorOp) + (" :\n" + (String(match$1[0]) + ".")))]);
    } else {
      var eOperadorRes = {
        signaturaOp: /* Indefinida */0,
        valorOp: infoOp,
        precedencia: precOp1,
        asociatividad: asocOp1
      };
      var exprOpRes = /* EOperadorApl */Block.__(6, [{
            op: eOperadorRes,
            izq: exprIzq,
            der: match$1[0]
          }]);
      var _lexerRes = Curry._1(lexer.sigToken, /* () */0);
      var _aceptarSoloOp = false;
      var _fnEnOp = function (param) {
        return /* () */0;
      };
      var _funValorDefecto = function (param) {
        return /* PReturn */1;
      };
      while(true) {
        var funValorDefecto = _funValorDefecto;
        var fnEnOp = _fnEnOp;
        var aceptarSoloOp = _aceptarSoloOp;
        var lexerRes = _lexerRes;
        if (typeof lexerRes === "number") {
          return /* PExito */Block.__(0, [exprOpRes]);
        } else if (lexerRes.tag) {
          return /* PError */Block.__(1, [lexerRes[0]]);
        } else {
          var token = lexerRes[0];
          switch (token.tag | 0) {
            case /* TNuevaLinea */0 :
                if (aceptarSoloOp) {
                  return Curry._1(funValorDefecto, /* () */0);
                } else {
                  Curry._1(lexer.retroceder, /* () */0);
                  var match$2 = Curry._1(lexer.lookAheadSignificativo, true);
                  var fnEstablecer = match$2[3];
                  var indentacion = match$2[1];
                  var expresionRespuesta = /* PExito */Block.__(0, [exprOpRes]);
                  if (esExprPrincipal && indentacion >= nivel) {
                    if (indentacion === nivel) {
                      var nuevaFnEst = (function(fnEstablecer){
                      return function nuevaFnEst(param) {
                        Curry._1(fnEstablecer, /* () */0);
                        Curry._1(lexer.sigToken, /* () */0);
                        return /* () */0;
                      }
                      }(fnEstablecer));
                      var funSiNoEsOp = (function(fnEstablecer,expresionRespuesta){
                      return function funSiNoEsOp(param) {
                        Curry._1(fnEstablecer, /* () */0);
                        var sigExpresionRaw = sigExpresion(nivel, nivel, false, 0, /* Izq */0, true);
                        if (typeof sigExpresionRaw === "number") {
                          return expresionRespuesta;
                        } else if (sigExpresionRaw.tag) {
                          return /* PError */Block.__(1, [sigExpresionRaw[0]]);
                        } else {
                          var nuevaExpr = sigExpresionRaw[0];
                          if (nuevaExpr.tag === /* EBloque */8) {
                            return /* PExito */Block.__(0, [/* EBloque */Block.__(8, [/* :: */[
                                            exprOpRes,
                                            nuevaExpr[0]
                                          ]])]);
                          } else {
                            return /* PExito */Block.__(0, [/* EBloque */Block.__(8, [/* :: */[
                                            exprOpRes,
                                            /* :: */[
                                              nuevaExpr,
                                              /* [] */0
                                            ]
                                          ]])]);
                          }
                        }
                      }
                      }(fnEstablecer,expresionRespuesta));
                      _funValorDefecto = funSiNoEsOp;
                      _fnEnOp = nuevaFnEst;
                      _aceptarSoloOp = true;
                      _lexerRes = match$2[0];
                      continue ;
                    } else {
                      Curry._1(fnEstablecer, /* () */0);
                      _funValorDefecto = (function (param) {
                          return /* PReturn */1;
                        });
                      _fnEnOp = (function (param) {
                          return /* () */0;
                        });
                      _aceptarSoloOp = false;
                      _lexerRes = Curry._1(lexer.sigToken, /* () */0);
                      continue ;
                    }
                  } else {
                    return expresionRespuesta;
                  }
                }
            case /* TGenerico */2 :
                if (aceptarSoloOp) {
                  return Curry._1(funValorDefecto, /* () */0);
                } else {
                  var textoError = generarTextoError(token[0]);
                  return /* PError */Block.__(1, ["No se esperaba un genérico luego de la aplicación del operador.\n\n" + (String(textoError) + "")]);
                }
            case /* TComentario */3 :
                continue ;
            case /* TOperador */7 :
                var infoOp2 = token[0];
                Curry._1(fnEnOp, /* () */0);
                var match$3 = obtInfoOp(infoOp2.valor);
                return sigExprOperador(exprOpRes, infoOp2, nivel, match$3[0], match$3[1], esExprPrincipal);
            case /* TParenAb */8 :
                if (aceptarSoloOp) {
                  return Curry._1(funValorDefecto, /* () */0);
                } else {
                  var sigExpr = sigExprParen(token[0], nivel, nivel);
                  if (typeof sigExpr === "number" || sigExpr.tag) {
                    return /* PError */Block.__(1, ["Hay un parentesis sin cerrar."]);
                  } else {
                    var infoOpFunApl_valor = "ñ";
                    var infoOpFunApl = {
                      valor: infoOpFunApl_valor,
                      inicio: -1,
                      final: -1,
                      numLinea: -1,
                      posInicioLinea: -1
                    };
                    var match$4 = obtInfoOp("ñ");
                    return /* PExito */Block.__(0, [/* EOperadorApl */Block.__(6, [{
                                    op: {
                                      signaturaOp: /* Indefinida */0,
                                      valorOp: infoOpFunApl,
                                      precedencia: match$4[0],
                                      asociatividad: match$4[1]
                                    },
                                    izq: exprOpRes,
                                    der: sigExpr[0]
                                  }])]);
                  }
                }
            case /* TParenCer */9 :
                if (aceptarSoloOp) {
                  return Curry._1(funValorDefecto, /* () */0);
                } else {
                  Curry._1(lexer.retroceder, /* () */0);
                  return /* PExito */Block.__(0, [exprOpRes]);
                }
            case /* TAgrupAb */10 :
                if (aceptarSoloOp) {
                  return Curry._1(funValorDefecto, /* () */0);
                } else {
                  var textoError$1 = generarTextoError(token[0]);
                  return /* PError */Block.__(1, ["Este signo de agrupación aun no está soportado.\n\n" + (String(textoError$1) + "")]);
                }
            case /* TAgrupCer */11 :
                if (aceptarSoloOp) {
                  return Curry._1(funValorDefecto, /* () */0);
                } else {
                  var textoError$2 = generarTextoError(token[0]);
                  return /* PError */Block.__(1, ["Este signo de agrupación aun no está soportado.\n\n" + (String(textoError$2) + "")]);
                }
            case /* PC_LET */12 :
                if (aceptarSoloOp) {
                  return Curry._1(funValorDefecto, /* () */0);
                } else {
                  var textoError$3 = generarTextoError(token[0]);
                  return /* PError */Block.__(1, ["No se esperaba la palabra clave \'let\' luego de la aplicación del operador.\n\n" + (String(textoError$3) + "")]);
                }
            case /* PC_CONST */13 :
                if (aceptarSoloOp) {
                  return Curry._1(funValorDefecto, /* () */0);
                } else {
                  var textoError$4 = generarTextoError(token[0]);
                  return /* PError */Block.__(1, ["No se esperaba la palabra clave \'const\' luego de la aplicación del operador.\n\n" + (String(textoError$4) + "")]);
                }
            default:
              if (aceptarSoloOp) {
                return Curry._1(funValorDefecto, /* () */0);
              } else {
                var infoOp2_valor = "ñ";
                var infoOp2$1 = {
                  valor: infoOp2_valor,
                  inicio: -1,
                  final: -1,
                  numLinea: -1,
                  posInicioLinea: -1
                };
                var match$5 = obtInfoOp("ñ");
                Curry._1(lexer.retroceder, /* () */0);
                return sigExprOperador(exprOpRes, infoOp2$1, nivel, match$5[0], match$5[1], esExprPrincipal);
              }
          }
        }
      };
    }
    return /* PError */Block.__(1, ["Se esperaba una expresión a la derecha del operador " + (String(valorOp) + "")]);
  };
  var sigExprParen = function (infoParen, nivel, nivelPadre) {
    var sigToken = sigExpresion(nivelPadre, nivelPadre, false, 0, /* Izq */0, true);
    if (typeof sigToken === "number") {
      if (sigToken === /* PEOF */0) {
        var textoErr = generarTextoError(infoParen);
        var numLinea = infoParen.numLinea;
        var numColumna = infoParen.inicio - infoParen.posInicioLinea | 0;
        return /* PError */Block.__(1, ["El parentesis abierto en " + (String(numLinea) + ("," + (String(numColumna) + (" no está cerrado.\n\n" + (String(textoErr) + "")))))]);
      } else {
        return /* PError */Block.__(1, ["Error de indentaci\xc3\xb3n. El parentesis no ha sido cerrado."]);
      }
    } else if (sigToken.tag) {
      return sigToken;
    } else {
      var ultimoToken = Curry._1(lexer.sigToken, /* () */0);
      if (typeof ultimoToken === "number") {
        var textoErr$1 = generarTextoError(infoParen);
        var numLinea$1 = infoParen.numLinea;
        var numColumna$1 = infoParen.inicio - infoParen.posInicioLinea | 0;
        return /* PError */Block.__(1, ["El parentesis abierto en " + (String(numLinea$1) + ("," + (String(numColumna$1) + (" contiene una expresion, pero no está cerrado.\n\n" + (String(textoErr$1) + "")))))]);
      } else if (ultimoToken.tag) {
        var textoErr$2 = generarTextoError(infoParen);
        var numLinea$2 = infoParen.numLinea;
        var numColumna$2 = infoParen.inicio - infoParen.posInicioLinea | 0;
        return /* PError */Block.__(1, ["El parentesis abierto en " + (String(numLinea$2) + ("," + (String(numColumna$2) + (" no está cerrado.\n\n" + (String(textoErr$2) + ("\nDebido a un error léxico: " + (String(ultimoToken[0]) + "")))))))]);
      } else if (ultimoToken[0].tag === /* TParenCer */9) {
        return /* PExito */Block.__(0, [sigToken[0]]);
      } else {
        return /* PError */Block.__(1, ["Se esperaba un cierre de parentesis."]);
      }
    }
  };
  var sigExpresion = function (nivel, _nivelPadre, iniciarIndentacionEnToken, precedencia, asociatividad, esExprPrincipal) {
    while(true) {
      var nivelPadre = _nivelPadre;
      var obtNuevoNivel = function (infoToken) {
        if (iniciarIndentacionEnToken) {
          return infoToken.inicio - infoToken.posInicioLinea | 0;
        } else {
          return nivel;
        }
      };
      var resultado = Curry._1(lexer.sigToken, /* () */0);
      if (typeof resultado === "number") {
        return /* PEOF */0;
      } else if (resultado.tag) {
        return /* PError */Block.__(1, [resultado[0]]);
      } else {
        var token = resultado[0];
        switch (token.tag | 0) {
          case /* TNuevaLinea */0 :
              Curry._1(lexer.retroceder, /* () */0);
              var match = Curry._1(lexer.lookAheadSignificativo, true);
              if (match[1] >= nivel) {
                Curry._1(match[3], /* () */0);
                _nivelPadre = nivel;
                continue ;
              } else {
                return /* PReturn */1;
              }
          case /* TIdentificador */1 :
              var infoId = token[0];
              var infoId$1 = infoId;
              var nivel$1 = obtNuevoNivel(infoId);
              var precedencia$1 = precedencia;
              var esExprPrincipal$1 = esExprPrincipal;
              var primeraExprId = /* EIdentificador */Block.__(0, [{
                    signatura: /* Indefinida */0,
                    valorId: infoId$1
                  }]);
              var _lexerRes = Curry._1(lexer.sigToken, /* () */0);
              var _aceptarSoloOperador = false;
              var _fnEnOp = function (param) {
                return /* () */0;
              };
              var _funValorDefecto = function (param) {
                return /* PReturn */1;
              };
              while(true) {
                var funValorDefecto = _funValorDefecto;
                var fnEnOp = _fnEnOp;
                var aceptarSoloOperador = _aceptarSoloOperador;
                var lexerRes = _lexerRes;
                if (typeof lexerRes === "number") {
                  return /* PExito */Block.__(0, [primeraExprId]);
                } else if (lexerRes.tag) {
                  return /* PError */Block.__(1, [lexerRes[0]]);
                } else {
                  var token$1 = lexerRes[0];
                  switch (token$1.tag | 0) {
                    case /* TNuevaLinea */0 :
                        if (aceptarSoloOperador) {
                          return Curry._1(funValorDefecto, /* () */0);
                        } else {
                          Curry._1(lexer.retroceder, /* () */0);
                          var match$1 = Curry._1(lexer.lookAheadSignificativo, true);
                          var fnEstablecer = match$1[3];
                          var indentacion = match$1[1];
                          var expresionRespuesta = /* PExito */Block.__(0, [primeraExprId]);
                          if (esExprPrincipal$1 && indentacion >= nivel$1) {
                            if (indentacion === nivel$1) {
                              var nuevaFnEst = (function(fnEstablecer){
                              return function nuevaFnEst(param) {
                                Curry._1(fnEstablecer, /* () */0);
                                Curry._1(lexer.sigToken, /* () */0);
                                return /* () */0;
                              }
                              }(fnEstablecer));
                              var funSiNoEsOp = (function(nivel$1,primeraExprId,fnEstablecer,expresionRespuesta){
                              return function funSiNoEsOp(param) {
                                Curry._1(fnEstablecer, /* () */0);
                                var sigExpresionRaw = sigExpresion(nivel$1, nivel$1, false, 0, /* Izq */0, true);
                                if (typeof sigExpresionRaw === "number") {
                                  return expresionRespuesta;
                                } else if (sigExpresionRaw.tag) {
                                  return /* PError */Block.__(1, [sigExpresionRaw[0]]);
                                } else {
                                  var nuevaExpr = sigExpresionRaw[0];
                                  if (nuevaExpr.tag === /* EBloque */8) {
                                    return /* PExito */Block.__(0, [/* EBloque */Block.__(8, [/* :: */[
                                                    primeraExprId,
                                                    nuevaExpr[0]
                                                  ]])]);
                                  } else {
                                    return /* PExito */Block.__(0, [/* EBloque */Block.__(8, [/* :: */[
                                                    primeraExprId,
                                                    /* :: */[
                                                      nuevaExpr,
                                                      /* [] */0
                                                    ]
                                                  ]])]);
                                  }
                                }
                              }
                              }(nivel$1,primeraExprId,fnEstablecer,expresionRespuesta));
                              _funValorDefecto = funSiNoEsOp;
                              _fnEnOp = nuevaFnEst;
                              _aceptarSoloOperador = true;
                              _lexerRes = match$1[0];
                              continue ;
                            } else {
                              Curry._1(fnEstablecer, /* () */0);
                              _funValorDefecto = (function (param) {
                                  return /* PReturn */1;
                                });
                              _fnEnOp = (function (param) {
                                  return /* () */0;
                                });
                              _aceptarSoloOperador = false;
                              _lexerRes = Curry._1(lexer.sigToken, /* () */0);
                              continue ;
                            }
                          } else {
                            return expresionRespuesta;
                          }
                        }
                    case /* TGenerico */2 :
                        if (aceptarSoloOperador) {
                          return Curry._1(funValorDefecto, /* () */0);
                        } else {
                          var textoError = generarTextoError(token$1[0]);
                          return /* PError */Block.__(1, ["No se esperaba un genérico luego del identificador.\n\n" + (String(textoError) + "")]);
                        }
                    case /* TComentario */3 :
                        continue ;
                    case /* TOperador */7 :
                        var infoOp = token$1[0];
                        Curry._1(fnEnOp, /* () */0);
                        var match$2 = obtInfoOp(infoOp.valor);
                        var asocOp = match$2[1];
                        var precOp = match$2[0];
                        if (precOp > precedencia$1 || precOp === precedencia$1 && asocOp === /* Der */1) {
                          return sigExprOperador(primeraExprId, infoOp, nivel$1, precOp, asocOp, esExprPrincipal$1);
                        } else {
                          Curry._1(lexer.retroceder, /* () */0);
                          return /* PExito */Block.__(0, [primeraExprId]);
                        }
                    case /* TParenAb */8 :
                        if (aceptarSoloOperador) {
                          return Curry._1(funValorDefecto, /* () */0);
                        } else {
                          var sigExpr = sigExprParen(token$1[0], nivel$1, nivel$1);
                          if (typeof sigExpr === "number" || sigExpr.tag) {
                            return /* PError */Block.__(1, ["Hay un parentesis sin cerrar."]);
                          } else {
                            var infoOpFunApl_valor = "ñ";
                            var infoOpFunApl = {
                              valor: infoOpFunApl_valor,
                              inicio: -1,
                              final: -1,
                              numLinea: -1,
                              posInicioLinea: -1
                            };
                            var match$3 = obtInfoOp("ñ");
                            return /* PExito */Block.__(0, [/* EOperadorApl */Block.__(6, [{
                                            op: {
                                              signaturaOp: /* Indefinida */0,
                                              valorOp: infoOpFunApl,
                                              precedencia: match$3[0],
                                              asociatividad: match$3[1]
                                            },
                                            izq: primeraExprId,
                                            der: sigExpr[0]
                                          }])]);
                          }
                        }
                    case /* TParenCer */9 :
                        if (aceptarSoloOperador) {
                          return Curry._1(funValorDefecto, /* () */0);
                        } else {
                          Curry._1(lexer.retroceder, /* () */0);
                          return /* PExito */Block.__(0, [primeraExprId]);
                        }
                    case /* TAgrupAb */10 :
                        var textoError$1 = generarTextoError(token$1[0]);
                        return /* PError */Block.__(1, ["Este signo de agrupación aun no está soportado.\n\n" + (String(textoError$1) + "")]);
                    case /* TAgrupCer */11 :
                        var textoError$2 = generarTextoError(token$1[0]);
                        return /* PError */Block.__(1, ["Este signo de agrupación aun no está soportado.\n\n" + (String(textoError$2) + "")]);
                    case /* PC_LET */12 :
                        var textoError$3 = generarTextoError(token$1[0]);
                        return /* PError */Block.__(1, ["No se esperaba la palabra clave \'let\' luego de la aplicación del operador.\n\n" + (String(textoError$3) + "")]);
                    case /* PC_CONST */13 :
                        var textoError$4 = generarTextoError(token$1[0]);
                        return /* PError */Block.__(1, ["No se esperaba la palabra clave \'const\' luego de la aplicación del operador.\n\n" + (String(textoError$4) + "")]);
                    default:
                      if (aceptarSoloOperador) {
                        return Curry._1(funValorDefecto, /* () */0);
                      } else {
                        Curry._1(lexer.retroceder, /* () */0);
                        if (14 > precedencia$1) {
                          var infoOpFunApl_valor$1 = "ñ";
                          var infoOpFunApl$1 = {
                            valor: infoOpFunApl_valor$1,
                            inicio: -1,
                            final: -1,
                            numLinea: -1,
                            posInicioLinea: -1
                          };
                          return sigExprOperador(primeraExprId, infoOpFunApl$1, nivel$1, 14, /* Izq */0, esExprPrincipal$1);
                        } else if (14 === precedencia$1 && false) {
                          var infoOpFunApl_valor$2 = "ñ";
                          var infoOpFunApl$2 = {
                            valor: infoOpFunApl_valor$2,
                            inicio: -1,
                            final: -1,
                            numLinea: -1,
                            posInicioLinea: -1
                          };
                          return sigExprOperador(primeraExprId, infoOpFunApl$2, nivel$1, 14, /* Izq */0, esExprPrincipal$1);
                        } else {
                          return /* PExito */Block.__(0, [primeraExprId]);
                        }
                      }
                  }
                }
              };
          case /* TGenerico */2 :
              return /* PError */Block.__(1, ["Los genericos aun no estan soportados."]);
          case /* TComentario */3 :
              _nivelPadre = nivel;
              continue ;
          case /* TNumero */4 :
              return /* PExito */Block.__(0, [/* ENumero */Block.__(2, [token[0]])]);
          case /* TTexto */5 :
              return /* PExito */Block.__(0, [/* ETexto */Block.__(3, [token[0]])]);
          case /* TBool */6 :
              return /* PExito */Block.__(0, [/* EBool */Block.__(4, [token[0]])]);
          case /* TOperador */7 :
              var textoErr = generarTextoError(token[0]);
              return /* PError */Block.__(1, ["No se puede usar un operador como expresión. Si esa es tu intención, rodea el operador en paréntesis, por ejemplo: (+)\n\n" + (String(textoErr) + "")]);
          case /* TParenAb */8 :
              var infoParen = token[0];
              return sigExprParen(infoParen, obtNuevoNivel(infoParen), nivelPadre);
          case /* TParenCer */9 :
              var textoErr$1 = generarTextoError(token[0]);
              return /* PError */Block.__(1, ["No se esperaba un parentesis aquí. No hay ningún parentesis a cerrar.\n\n" + (String(textoErr$1) + "")]);
          case /* TAgrupAb */10 :
          case /* TAgrupCer */11 :
              return /* PError */Block.__(1, ["Otros signos de agrupación aun no estan soportados."]);
          case /* PC_LET */12 :
              return sigExprDeclaracion(obtNuevoNivel(token[0]), true);
          case /* PC_CONST */13 :
              return sigExprDeclaracion(obtNuevoNivel(token[0]), false);
          
        }
      }
    };
  };
  var exprRe = sigExpresion(0, 0, true, 0, /* Izq */0, true);
  if (typeof exprRe === "number") {
    return /* ExitoParser */Block.__(0, [/* EBloque */Block.__(8, [/* [] */0])]);
  } else if (exprRe.tag) {
    return /* ErrorParser */Block.__(1, [exprRe[0]]);
  } else {
    return /* ExitoParser */Block.__(0, [exprRe[0]]);
  }
}

exports.$great$great$eq = $great$great$eq;
exports.obtInfoFunAppl = obtInfoFunAppl;
exports.obtInfoOp = obtInfoOp;
exports.parseTokens = parseTokens;
/* No side effect */
