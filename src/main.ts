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
        </div>
    </div>
`

const $canvas = document.querySelector('#micanvas') as HTMLCanvasElement
draw($canvas)

const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D
let bars = new Bars(30, $canvas.width, $canvas.height, ctx)

bars.showBars(undefined)

function start() {
    bars = new Bars(30, $canvas.width, $canvas.height, ctx)
    bars.showBars(undefined)
}

function sortBars(algo: string) {
    bars.sortBars(algo)
}

const $startBtn = document.querySelector('#start_button') as HTMLButtonElement
const $bubleBtn = document.querySelector('#buble_sort') as HTMLButtonElement
const $insertBtn = document.querySelector('#insertion_sort') as HTMLButtonElement

$startBtn.addEventListener('click', start)
$bubleBtn.addEventListener('click', ()=>sortBars('buble'))
$insertBtn.addEventListener('click', ()=>sortBars('insertion'))



