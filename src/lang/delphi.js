// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// Delphi Language
// Author: [Björn Ahrens]
// --

// https://docwiki.embarcadero.com/RADStudio/Athens/en/Fundamental_Syntactic_Elements_(Delphi)

export class delphi extends generic {

    setupLanguage() {

        this.rules = [
            // strings, chars
            // Delphi uses single quotes for strings and characters: 
            //   'hello world'
            // additionally control strings are sequences of one or more characters
            // starting with # followed by a decimal or hexadecimal value
            //   #13#10 #$0D#$0A
            _language_common_rules.sqStrings,
            {
                regex: /(#[0-9]+|#\$[0-9a-fA-F]+)/g,
                type: 's0'
            },

            // properties
            _language_common_rules.prop,

            // keywords
            {
                regex: /\b(array|class|constructor|destructor|dispinterface|exports|file|finalization|function|implementation|initialization|inline|interface|library|object|of|packed|procedure|program|property|record|set|unit|uses)\b/gi,
                type: 'k0'
            },
            // private, protected, public, published and automated are keywords only within the context of class/record type declarations
            {
                regex: /\b(automated|private|protected|public|published)\b/gi,
                type: 'k0'
            }, 

            // unit names / namespaces
            // uses is followed by mutliple namespaces separated by , and finalized by ;
            // library, program and unit only allow one namespace finalized by ;
            {
                regex: /(?:^\s*(uses)\s+|(?<=(?:uses)[^;]*)\b)([\w.]+)\s*(?:,\s*|;)/gmi,
                type: ['k0', 'k10']
            },
            {
                regex: /^\s*(library|program|unit)\s+([\w.]+)\s*;/gmi,
                type: ['k0', 'k10']
            },

            // control keywords
            {
                regex: /\b(asm|begin|case|do|downto|else|end|except|finally|for|goto|if|raise|repeat|then|to|try|until|while|with)\b/gi,
                type: 'k1'
            },

            // variable / type initialization
            {
                regex: /\b(const|resourcestring|type|threadvar|var)\b/gi,
                type: 'k2'
            },

            // operator
            {
                regex: /\b(and|as|div|in|is|mod|not|or|shl|shr|xor)\b/gi,
                type: 'k3'
            },

            // directives
            {
                regex: /\b(absolute|abstract|assembler|cdecl|contains|default|delayed|deprecated|dispid|dynamic|experimental|export|external|final|forward|helper|implements|inline|library|local|message|nodefault|operator|overload|override|package|pascal|platform|read|readonly|reference|register|reintroduce|requires|safecall|sealed|static|stdcall|stored|strict|unsafe|varargs|virtual|winapi|write|writeonly)\b/gi,
                type: 'k4'
            },
            // index only is a directive within property declarations
            {
                regex: /(?<=\bproperty[^;]*)\b(index)\b(?=[^;]*)/gi,
                type: 'k4'
            }, 
            // name only is a directive within exports declarations
            {
                regex: /(?<=\bexports[^;]*)\b(name)\b(?=[^;]*)/gmi,
                type: 'k4'
            }, 

            // types (integers)
            // https://docwiki.embarcadero.com/RADStudio/Athens/en/Simple_Types_(Delphi)#Integer_Types
            {
                regex: /\b(byte|cardinal|fixedint|fixeduint|int8|int16|int32|int64|integer|longint|longword|nativeint|nativeuint|shortint|smallint|uint8|uint16|uint32|uint64|word)\b/gi,
                type: 'k5'
            },
            // types (chars and strings)
            // https://docwiki.embarcadero.com/RADStudio/Athens/en/Simple_Types_(Delphi)#Character_Types
            // https://docwiki.embarcadero.com/RADStudio/Athens/en/String_Types_(Delphi)
            {
                regex: /\b(ansichar|ansistring|char|ucs2char|ucs4char|shortstring|string|unicodestring|widechar|widestring)\b/gi,
                type: 'k5'
            },
            // types (boolean)
            // https://docwiki.embarcadero.com/RADStudio/Athens/en/Simple_Types_(Delphi)#Boolean_Types
            {
                regex: /\b(boolean|bytebool|longbool|wordbool)\b/gi,
                type: 'k5'
            },
            // types (real types)
            // https://docwiki.embarcadero.com/RADStudio/Athens/en/Simple_Types_(Delphi)#Real_Types
            {
                regex: /\b(comp|currency|double|extended|real|real48|single)\b/gi,
                type: 'k5'
            },

            // labels
            {
                regex: /\b(label)\b/gi,
                type: 'k6'
            },

            // qualifier/modifier
            // const and var are also regualt keywords, so only use as qualifiers inside brackets (ie function declarations)
            {
                regex: /(?<=\([^)]*)\b(const|var|out)\b(?=[^\)]*\))/gmi,
                type: 'k8'
            },

            // special inheritance
            {
                regex: /\b(inherited|self)\b/gi,
                type: 'k9'
            },

            // function/method calls
            _language_common_rules.fCalls,
            _language_common_rules.mCalls,

            // boolean, null
            _language_common_rules.boolean,
            // null is nil
            {
                regex: /\b(nil)\b/gi,
                type: 'e1'
            },

            // compiler directives {$ ... }
            {
                regex: /(\{\$[\s\S]*?\})/g,
                type: 'e4'
            },

            // comments
            _language_common_rules.slashComments,
            // blockComments {} or (* *)
            {
                regex: /(\{[\s\S]*?\}|\(\*[\s\S]*?\))/g,
                type: 'c1'
            },
            // docComments ///
            {
                regex: /(?:^|[^\\])(\/\/\/.*)$/gm,
                type: 'c0'
            },

            // numbers
            _language_common_rules.int,
            _language_common_rules.floats,
            _language_common_rules.bin,
            _language_common_rules.hex,
            _language_common_rules.octal,


            // brackets
            // {} are used for comments
            {
                regex: /[[\]()<>]+/g,
                type: 'g1'
            },

        ];
    }
}
