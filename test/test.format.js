/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const assert = require('chai').assert;
const log = require('winston');

const PersonalityTraitDescriptions = require('../lib/personality-trait-descriptions');
const formatText = require('../lib/utilities/format-text');

describe('format', () => {

  it('test plain formatting alone', () => {
    const text = "This is a **marked** text";

    assert.equal(
      formatText(text, { format : 'plain'}),
      text.replace(/\*\*/g, ''),
      'Plain format working'
    );

  });

  it('test html formatting alone', () => {
    const text = "This is a **marked** text";

    assert.equal(
      formatText(text, { format : 'html'}),
      "<p>This is a <strong>marked</strong> text</p>\n",
      'Html format working'
    );

  });

  it('test markdown formatting alone', () => {
    const text = "This is a **marked** text";

    assert.equal(
      formatText(text, { format : 'markdown'}),
      text,
      'Markdown format working'
    );

  });

  it('test description without format', () => {
    const descriptions = new PersonalityTraitDescriptions({ format : 'plain' });
    const text = descriptions.description('Neuroticism');
    assert.isOk(text.indexOf('**') == -1, 'Got plain text');
  });

  it('test description with html format', () => {
    const descriptions = new PersonalityTraitDescriptions({ format : 'html' });
    const text = descriptions.description('Neuroticism');
    assert.isOk(text.indexOf('<strong>') >= 0, 'Got html text');
  });

  it('test description with markdown format', () => {
    const descriptions = new PersonalityTraitDescriptions({ format : 'markdown' });
    const text = descriptions.description('Neuroticism');
    assert.isOk(text.indexOf('**') >= 0, 'Got markdown text');
  });

});
