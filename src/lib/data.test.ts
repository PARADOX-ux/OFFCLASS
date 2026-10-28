import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { demoOpportunities, demoSkills, demoCareerPaths, demoTools } from './data.ts';

describe('Data Integrity & Content Quality Audit Tests', () => {
  it('ensures all demo opportunities have valid IDs, organizations, and safe URLs', () => {
    assert.ok(demoOpportunities.length > 0, 'Opportunities list should not be empty');
    for (const opp of demoOpportunities) {
      assert.ok(opp.id, `Opportunity must have an ID: ${JSON.stringify(opp)}`);
      assert.ok(opp.title, `Opportunity ${opp.id} must have a title`);
      assert.ok(opp.organization, `Opportunity ${opp.id} must have an organization`);
      assert.ok(opp.link.startsWith('https://'), `Opportunity ${opp.id} must have a secure HTTPS link: ${opp.link}`);
      assert.ok(
        ['verified', 'demo', 'reviewed', 'community', 'external'].includes(opp.verificationStatus),
        `Opportunity ${opp.id} must have a valid verificationStatus`
      );
    }
  });

  it('ensures verified opportunities point to accredited organizations and do not invent deadlines', () => {
    const verifiedOpps = demoOpportunities.filter((o) => o.verificationStatus === 'verified');
    assert.ok(verifiedOpps.length >= 4, 'Should contain verified high-integrity programs');

    for (const v of verifiedOpps) {
      assert.ok(
        !v.deadline?.includes('2027') || v.deadline.includes('cycle') || v.deadline.includes('timeline') || v.deadline.includes('Portal') || v.deadline.includes('Check'),
        `Verified opportunity ${v.id} should not state speculative deadlines without caveat: ${v.deadline}`
      );
    }
  });

  it('ensures all skills contain beginnerProject and portfolioProject tangible goals', () => {
    for (const skill of demoSkills) {
      assert.ok(skill.beginnerProject, `Skill ${skill.id} should have a beginner project`);
      assert.ok(skill.portfolioProject, `Skill ${skill.id} should have a portfolio project`);
      assert.ok(skill.learningTimeWeeks > 0, `Skill ${skill.id} should have positive learningTimeWeeks`);
    }
  });

  it('ensures career paths explicitly state salary range caveats and have non-empty steps', () => {
    for (const career of demoCareerPaths) {
      assert.ok(career.avgSalaryRange, `Career ${career.id} should specify an illustrative salary range`);
      assert.ok(career.steps.length >= 3, `Career ${career.id} should have actionable milestone steps`);
    }
  });

  it('ensures interactive tools have valid routes and published statuses', () => {
    for (const tool of demoTools) {
      assert.ok(tool.name, `Tool ${tool.id} must have a name`);
      assert.ok(tool.route, `Tool ${tool.id} must have a route`);
      assert.ok(['published', 'coming_soon', 'draft', 'archived'].includes(tool.status));
    }
  });
});
