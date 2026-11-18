/**
 * "Why this step" content. Data lives in method-notes.json (docs/core-product.md §7–§8,
 * implemented verbatim); this module types it and derives the guide's spoken reason
 * clause from the same note so screen and voice never disagree.
 */
import raw from './method-notes.json';

export type Confidence = 'strong' | 'moderate' | 'emerging';

export interface Method {
  id: string;
  name: string;
  userDoes: string;
  why: string;
  confidence: Confidence;
  confidenceDetail: string | null;
  source: string;
}

export type MethodNoteKey =
  | 'interview.opening'
  | 'interview.near_term_scene'
  | 'interview.end_of_life_scene'
  | 'interview.life_goals'
  | 'interview.parent_picker'
  | 'interview.want_vs_should'
  | 'interview.week'
  | 'interview.record_scenes'
  | 'morning.hear_goals'
  | 'morning.first_two_minutes'
  | 'morning.obstacle_if_then'
  | 'morning.reframe'
  | 'morning.correction'
  | 'talk.opening'
  | 'talk.closing'
  | 'review.close_week'
  | 'review.pick_three'
  | 'review.if_then'
  | 'monthly.recalibration'
  | 'scene.playback';

export interface MethodNote {
  key: MethodNoteKey;
  moment: string;
  methodIds: string[];
  /** Two sentences: what to do, then why. */
  note: string;
  confidence: Confidence;
  confidenceDetail: string | null;
  source: string;
}

interface MethodNotesFile {
  version: string;
  sourceDoc: string;
  methods: Method[];
  notes: MethodNote[];
}

const data = raw as MethodNotesFile;

export const METHODS: readonly Method[] = data.methods;
export const METHOD_NOTES: readonly MethodNote[] = data.notes;

const notesByKey = new Map(METHOD_NOTES.map((n) => [n.key, n]));
const methodsById = new Map(METHODS.map((m) => [m.id, m]));

export function methodNote(key: MethodNoteKey): MethodNote {
  const note = notesByKey.get(key);
  if (!note) throw new Error(`No method note for ${key}`);
  return note;
}

export function methodsFor(note: MethodNote): Method[] {
  return note.methodIds.map((id) => methodsById.get(id)).filter((m): m is Method => !!m);
}

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  strong: 'Strong evidence',
  moderate: 'Moderate evidence',
  emerging: 'Emerging evidence',
};

/**
 * The clause the guide speaks when it asks for an action, drawn from the same note:
 * "Spoken answers are remembered better and expose vague goals; strong evidence."
 */
export function spokenReason(key: MethodNoteKey): string {
  const note = methodNote(key);
  const why = reasonSentence(note.note);
  return `${why}; ${note.confidence} evidence.`;
}

/** The instruction half of a note: "Answer out loud." */
export function instructionSentence(note: string): string {
  return splitNote(note)[0];
}

/** The reason half of a note, without its trailing period. */
export function reasonSentence(note: string): string {
  const parts = splitNote(note);
  const reason = parts.length > 1 ? parts.slice(1).join(' ') : parts[0];
  return reason.replace(/\.$/, '');
}

function splitNote(note: string): string[] {
  return note
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
