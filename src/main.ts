import './style.css'
import { draw, Bars } from './canvas'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
        <h1>Canvas practice</h1>
        <canvas id="micanvas"></canvas>
        <div>
            <button id='start_button'>Start</button>
            <button id='buble_sort'>BubleSort</button>
            <button id='insertion_sort'>InsertionSort</button>
            <button id='simple_sort'>SimpleSort</button>
            <button id='selection_sort'>SelectionSort</button>
            <button id='merge_sort'>MergeSort</button>
        </div>
    </div>
`

const $canvas = document.querySelector('#micanvas') as HTMLCanvasElement
draw($canvas)

const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D
const numberOfBars = 30
let bars = new Bars(numberOfBars, $canvas.width, $canvas.height, ctx)

bars.showBars(undefined)

function start() {
    bars = new Bars(numberOfBars, $canvas.width, $canvas.height, ctx)
    bars.showBars(undefined)
}

function sortBars(algo: string) {
    bars.sortBars(algo)
}

const $startBtn = document.querySelector('#start_button') as HTMLButtonElement
const $bubleBtn = document.querySelector('#buble_sort') as HTMLButtonElement
const $insertBtn = document.querySelector('#insertion_sort') as HTMLButtonElement
const $simpleBtn = document.querySelector('#simple_sort') as HTMLButtonElement
const $selectBtn = document.querySelector('#selection_sort') as HTMLButtonElement
const $mergeBtn = document.querySelector('#merge_sort') as HTMLButtonElement


$startBtn.addEventListener('click', start)
$bubleBtn.addEventListener('click', ()=>sortBars('buble'))
$insertBtn.addEventListener('click', ()=>sortBars('insertion'))
$simpleBtn.addEventListener('click', ()=>sortBars('simple'))
$selectBtn.addEventListener('click', ()=>sortBars('selection'))
$mergeBtn.addEventListener('click', ()=>sortBars('merge'))

// const arr = [2,3,1,65,7,1,2]
// bars.mergeSort(arr)
// console.log(arr)