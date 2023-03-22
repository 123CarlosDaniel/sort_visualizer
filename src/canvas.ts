export function draw(canvas : HTMLCanvasElement) {
    canvas.width = 600
    canvas.height = 400

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.strokeStyle = '#000'
    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.rect(0,0, canvas.width, canvas.height)
    ctx.stroke()

    // const minx = 50
    // const rangex = 400
    // let p = 0
    // let sign = 1
    // animate()
    // function animate() {
    //     const x = minx + rangex*p
    //     p = p + 0.02*sign
    //     if (p > 1 || p < 0) {
    //         sign *= -1
    //     }
    //     ctx.clearRect(0, 0, 600, 400)
    //     ctx.beginPath()
    //     ctx.rect(x, 50, 100, 100)
    //     ctx.strokeStyle = '#fff'
    //     ctx.fillStyle = '#000'
    //     ctx.fill()
    //     ctx.stroke()
    //     requestAnimationFrame(animate)
    // }

}

export class Bars{
    private len: number
    private containerWidth: number = 400
    private parentWidth: number
    private parentHeight: number
    private barWidth: number
    private gap: number = 8
    private maxH = 250
    private x: number
    private y: number = 350
    private ctx: CanvasRenderingContext2D
    private audioCtx: AudioContext | undefined
    arr: number[] = []

    constructor(len : number, parentW: number, parentH: number, ctx: CanvasRenderingContext2D) {
        this.parentWidth = parentW
        this.parentHeight = parentH
        this.x = Math.floor((this.parentWidth - this.containerWidth) / 2)
        this.barWidth = Math.floor((this.containerWidth - this.gap * (len - 1)) / (len))
        this.ctx = ctx
        this.len = len    
        this.arr = new Array(len)
        for (let i = 0; i < len; i++) {
            this.arr[i] = Math.floor(Math.random() * this.maxH)
        }
    }

    private playNote(freq: number) {
        if (this.audioCtx == undefined) {
            this.audioCtx = new AudioContext()
        }
        const dur = 0.1
        const osc = this.audioCtx.createOscillator()
        osc.frequency.value = freq
        osc.start()
        osc.stop(this.audioCtx.currentTime + dur)
        const node = this.audioCtx.createGain()
        node.gain.value = 0.1
        node.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + dur)
        osc.connect(node)
        node.connect(this.audioCtx.destination)
    }

    showBars(indices: number[] | undefined) {
        this.ctx.clearRect(10, 10, this.parentWidth - 20, this.parentHeight - 20)
        let x = this.x
        const ctx = this.ctx
        ctx.fillStyle = '#fff'
        ctx.lineWidth = 0.1
        this.arr.forEach((h, i) => {
            ctx.beginPath()
            ctx.rect(x, this.y - h, this.barWidth, h)
            if (indices && indices.includes(i)) {
                ctx.fillStyle = 'rgb(180, 56, 80)'
            }
            ctx.fill()
            ctx.fillStyle = 'rgb(255,255,255)'
            ctx.stroke()
            x += this.gap + this.barWidth
        })
    }

    sortBars(algo: string) {
        const copyArr = [...this.arr]
        let swaps: number[][] = []
        switch (algo) {
            case 'buble' : {
                swaps = this.bubleSort(copyArr)
                break
            }
            case 'insertion' : {
                swaps = this.insertionSort(copyArr)
                break
            }
            case 'simple' : {
                swaps = this.simpleSort(copyArr)
                break
            }
            case 'selection' : {
                swaps = this.selectionSort(copyArr)
                break
            }
            case 'merge' : {
                swaps = this.mergeSort(copyArr)
                break
            }
        } 
        this.animate(swaps, 0)
    }

    private animate(swaps: number[][], index: number) {
        if (index == swaps.length) {
            this.showBars(undefined)
            return
        }
        const [i, j] = swaps[index];
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]]
        this.playNote(200 + this.arr[i] * (500 / this.maxH))
        this.playNote(200 + this.arr[j] * (500 / this.maxH))
        this.showBars([i, j])
        setTimeout(() => {
            this.animate(swaps, index + 1)
        }, 90)
    }

    private bubleSort(arr: number[]) {
        const swaps = []
        for (let j = 1; j < this.len; j++) {
            for (let i = 0; i < this.len - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                    swaps.push([i, i + 1])
                }
            }
        }
        return swaps
    }

    private insertionSort(arr: number[]) {
        const swaps = []
        for (let i = 1; i < this.len; i++) {
            let key = arr[i]
            let j = i - 1
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j]
                swaps.push([j + 1, j])
                j -= 1
            }
            arr[j + 1] = key
        }
        return swaps
    }

    private simpleSort(arr: number[]) {
        const swaps = []
        for (let i = 0; i < this.len; i++) {
            for (let j = i + 1; j < this.len; j++) {
                if (arr[j] < arr[i]) {
                    [arr[i], arr[j]] = [arr[j], arr[i]]
                    swaps.push([i, j])
                }
            }
        }
        return swaps
    }

    private selectionSort(arr: number[]) {
        const swaps = []
        for (let i = 0; i < this.len - 1; i++) {
            let min = i
            for (let j = i + 1; j < this.len; j++) {
                if (arr[j] < arr[min]) {
                    min = j
                }
            }
            [arr[min], arr[i]] = [arr[i], arr[min]]
            swaps.push([min, i])
        }
        return swaps
    }

    public mergeSort(arr: number[]) {
        const swaps: number[][] = []

        const merge = (arr: number[], p: number, q: number, r: number) => {
            let n1 = q - p + 1
            let n2 = r - q
            const L = new Array(n1 + 1)
            const R = new Array(n2 + 1)

            for (let i = 0; i < n1; i++) {
                L[i] = arr[p + i]
            }
            for (let i = 0; i < n2; i++) {
                R[i] = arr[q + i + 1]
            }
            L[n1] = R[n2] = Infinity
            let i = 0, j = 0
            for (let k = p; k < (r + 1); k++) {
                if (L[i] < R[j]) {
                    arr[k] = L[i]
                    swaps.push([k, p + i])
                    i ++;
                }
                else {
                    arr[k] = R[j]
                    swaps.push([k, q + j + 1])
                    j ++;
                }
            }
        } 
        const _mergeSort = (arr: number[], p: number, r: number) => {
            if (p < r) {
                let q = Math.floor((p + r) / 2)
                _mergeSort(arr, p, q)
                _mergeSort(arr, q + 1, r)
                merge(arr, p, q, r)
            } 
        }   
        _mergeSort(arr, 0, arr.length - 1)      
        return swaps
    }
}