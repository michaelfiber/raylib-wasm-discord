mergeInto(LibraryManager.library, {
	Say: function (textPtr) {
		if ('speechSynthesis' in window) {
			if (window.speechSynthesis.speaking) return;
			let text = UTF8ToString(textPtr);
			const utterThis = new SpeechSynthesisUtterance(text);
			window.speechSynthesis.speak(utterThis);
		}
	},
	Vibrate: function (intArrayPtr, count) {
		let sequence = [];
		for (let current = intArrayPtr; current < intArrayPtr + count * 4; current += 4) {
			sequence.push(HEAP32[current >> 2]);
		}
		if ('vibrate' in navigator) {
			navigator.vibrate(sequence);
		}
	},
	RegisterOrientationPointers: function (betaPtr, gammaPtr) {
		window.addEventListener('deviceorientation', (ev) => {
			// -180 to 180 degrees	
			setValue(betaPtr, ev.beta, 'float');

			// -90 to 90 derees
			setValue(gammaPtr, ev.gamma, 'float');
		});
	}
});