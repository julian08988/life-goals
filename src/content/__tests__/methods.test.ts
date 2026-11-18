import {
  METHODS,
  METHOD_NOTES,
  instructionSentence,
  methodNote,
  methodsFor,
  spokenReason,
} from '../methods';

describe('method notes content', () => {
  it('has the 14 methods and 20 notes from the spec', () => {
    expect(METHODS.length).toBe(14);
    expect(METHOD_NOTES.length).toBe(20);
  });

  it('references only known methods', () => {
    const ids = new Set(METHODS.map((m) => m.id));
    for (const note of METHOD_NOTES) {
      for (const id of note.methodIds) expect(ids.has(id)).toBe(true);
    }
  });

  it('uses only the three confidence levels', () => {
    for (const note of METHOD_NOTES) {
      expect(['strong', 'moderate', 'emerging']).toContain(note.confidence);
    }
  });

  it('derives the spoken reason from the note text', () => {
    expect(spokenReason('interview.opening')).toBe(
      'Spoken answers are remembered better and expose vague goals; strong evidence.',
    );
    expect(instructionSentence(methodNote('interview.opening').note)).toBe('Answer out loud.');
  });

  it('resolves methods for a note', () => {
    expect(methodsFor(methodNote('morning.reframe')).map((m) => m.id)).toEqual([
      'distanced_self_talk',
      'cognitive_restructuring',
    ]);
  });
});
