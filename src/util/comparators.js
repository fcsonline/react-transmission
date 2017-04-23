export function compareById(ta, tb) {
  return ta.id - tb.id;
}

export function compareByName(ta, tb) {
  return ta.publicName.localeCompare(tb.publicName) || compareById(ta, tb);
}

export function compareByQueue(ta, tb) {
  return ta.queuePosition - tb.queuePosition;
}

export function compareByAge(ta, tb) {
  const a = ta.addedDate;
  const b = tb.addedDate;

  return (b - a) || compareByQueue(ta, tb);
}

export function compareByState(ta, tb) {
  const a = ta.status;
  const b = tb.status;

  return (b - a) || compareByQueue(ta, tb);
}

export function compareByActivity(ta, tb) {
  const a = ta.activity;
  const b = tb.activity;

  return (b - a) || compareByState(ta, tb);
}

export function compareByRatio(ta, tb) {
  const a = ta.uploadRatio;
  const b = tb.uploadRatio;

  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }

  return compareByState(ta, tb);
}

export function compareByProgress(ta, tb) {
  const a = ta.percentDone;
  const b = tb.percentDone;

  return (a - b) || compareByRatio(ta, tb);
}

export function compareBySize(ta, tb) {
  const a = ta.totalSize;
  const b = tb.totalSize;

  return (a - b) || compareByName(ta, tb);
}
