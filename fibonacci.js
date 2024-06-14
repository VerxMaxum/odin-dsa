function fibs(n) {
    let seq = [];
    seq.push(0);
    if(n === 1) {
        return seq;
    }

    seq.push(1);
    if(n === 2) {
        return seq;
    }

    for(let i = 2; i < n; i++) {
        seq[i] = seq[i-1] + seq[i-2];
    }
    return seq;
}

function fibsRec(n) {
    if(n === 1) {
        return [0];
    }
    
    if(n === 2) {
        return [0,1];
    }

    const latest = fibsRec(n-1);
    const firstRecent = latest[latest.length-1];
    const secondRecent = latest[latest.length-2];
    return latest.concat([firstRecent + secondRecent]);
    
}
console.log("fibs");
console.log(fibs(8));
console.log("fibs rec");
console.log(fibsRec(8));