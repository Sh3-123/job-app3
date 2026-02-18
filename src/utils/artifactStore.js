export const ARTIFACT_PREFIX = 'rb_step_';

export const getArtifactKey = (step) => `${ARTIFACT_PREFIX}${step}_artifact`;

export const getArtifact = (step) => {
  return localStorage.getItem(getArtifactKey(step));
};

export const saveArtifact = (step, content) => {
  localStorage.setItem(getArtifactKey(step), content);
  // Dispatch event for reactive updates across components
  window.dispatchEvent(new Event('artifact-updated'));
};

export const clearArtifact = (step) => {
  localStorage.removeItem(getArtifactKey(step));
  window.dispatchEvent(new Event('artifact-updated'));
};

export const hasArtifact = (step) => {
  return !!getArtifact(step);
};
