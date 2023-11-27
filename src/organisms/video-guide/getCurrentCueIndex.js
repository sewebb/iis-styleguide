export default function getCurrentCueIndex(target) {
	const activeCue = target.activeCues[0];
	const { cues } = target;

	return Math.max(Array.prototype.indexOf.call(cues, activeCue), 0);
}
