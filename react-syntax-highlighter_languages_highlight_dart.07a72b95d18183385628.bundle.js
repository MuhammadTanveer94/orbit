(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{1805:function(module,exports){module.exports=function(hljs){var SUBST={className:"subst",variants:[{begin:"\\$[A-Za-z0-9_]+"}]},BRACED_SUBST={className:"subst",variants:[{begin:"\\${",end:"}"}],keywords:"true false null this is new super"},STRING={className:"string",variants:[{begin:"r'''",end:"'''"},{begin:'r"""',end:'"""'},{begin:"r'",end:"'",illegal:"\\n"},{begin:'r"',end:'"',illegal:"\\n"},{begin:"'''",end:"'''",contains:[hljs.BACKSLASH_ESCAPE,SUBST,BRACED_SUBST]},{begin:'"""',end:'"""',contains:[hljs.BACKSLASH_ESCAPE,SUBST,BRACED_SUBST]},{begin:"'",end:"'",illegal:"\\n",contains:[hljs.BACKSLASH_ESCAPE,SUBST,BRACED_SUBST]},{begin:'"',end:'"',illegal:"\\n",contains:[hljs.BACKSLASH_ESCAPE,SUBST,BRACED_SUBST]}]};BRACED_SUBST.contains=[hljs.C_NUMBER_MODE,STRING];return{keywords:{keyword:"assert async await break case catch class const continue default do else enum extends false final finally for if in is new null rethrow return super switch sync this throw true try var void while with yield abstract as dynamic export external factory get implements import library operator part set static typedef",built_in:"print Comparable DateTime Duration Function Iterable Iterator List Map Match Null Object Pattern RegExp Set Stopwatch String StringBuffer StringSink Symbol Type Uri bool double int num document window querySelector querySelectorAll Element ElementList"},contains:[STRING,hljs.COMMENT("/\\*\\*","\\*/",{subLanguage:"markdown"}),hljs.COMMENT("///","$",{subLanguage:"markdown"}),hljs.C_LINE_COMMENT_MODE,hljs.C_BLOCK_COMMENT_MODE,{className:"class",beginKeywords:"class interface",end:"{",excludeEnd:!0,contains:[{beginKeywords:"extends implements"},hljs.UNDERSCORE_TITLE_MODE]},hljs.C_NUMBER_MODE,{className:"meta",begin:"@[A-Za-z]+"},{begin:"=>"}]}}}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_dart.07a72b95d18183385628.bundle.js.map