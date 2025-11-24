const id = setInterval("console.log('untrusted WorkerGlobalScope.setInterval(.)')", 2);
setTimeout(() => clearInterval(id), 3);
