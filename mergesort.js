let arr1 = [3, 2, 1, 13, 8, 5, 0, 1];
let arr2 = [105, 79, 100, 110];

function mergeSort(arr, l, r) {
    let m = parseInt((l + r) / 2);
    if(l < r) {
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, r);
    }
}

function merge(arr, l, r) {
    let m = parseInt((l + r) / 2);
    let L = [];
    let R = [];
    for(let i = 0; i < m - l + 1; i++) {
        L[i] = arr[l+i];
    }
    for(let i = 0; i < r - m; i++) {
        R[i] = arr[m+1+i];
    }

    let k = l, i = 0, j = 0;
    while(i < m - l + 1 && j < r - m) {
        if(L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
        console.log("Array at index k: " + arr[k]);
    }

    while(i < m - l + 1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while(j < r - m) {
        arr[k] = R[j];
        j++;
        k++;
    }
    console.log("L: " + L);
    console.log("R: " + R);
    console.log(arr);
}

mergeSort(arr1, 0, arr1.length-1);
mergeSort(arr2, 0, arr2.length-1)
console.log(arr1);
console.log(arr2);