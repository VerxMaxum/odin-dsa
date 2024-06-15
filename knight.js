function knightMoves(start, end) {
    const moves = [
        [2,1],
        [2,-1],
        [1,2],
        [-1,2],
        [-2,1],
        [-2,-1],
        [1,-2],
        [-1,-2]
    ];
    let queue = [];
    let visited = [];
    start = {parent:undefined, x:start[0], y:start[1]};
    queue.push(start);

    let count = 0;
    let final;
    while(queue.length !== 0) {
        let node = queue.shift();
        console.log(node);
        if(node.x === end[0] && node.y === end[1]) {
            console.log("path found");
            final = node;
            break;
        }

        for(let move of moves) {
            let x = node.x + move[0];
            let y = node.y + move[1];
            
            let obj = {parent:node, x:x, y:y};
            if(withinBoundary(x) && withinBoundary(y) && !inVisited(obj)) {
                queue.push(obj);
                visited.push(obj);
            }
        }
    }

    const movesToEnd = processMoves(final);

    console.log("Here are your moves: " + movesToEnd);

    function processMoves(node) {
        let moves = [];
        while(node !== null && node !== undefined) {
            moves.push(`[${node.x}, ${node.y}]`);
            node = node.parent;
            count++;
        }

        console.log("In process moves");

        moves = moves.reverse();
        return moves;
    }

    function withinBoundary(move) {
        return move >= 0 && move <= 7;
    }

    function inVisited(obj) {
        for(let visit of visited) {
            if(obj.x === visit.x && obj.y === visit.y) {
                return true;
            }
        }
        
        return false;
    }
}

knightMoves([3,3],[4,3]);