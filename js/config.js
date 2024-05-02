const config = {
  canvas: document.querySelector('canvas'),
  canvasWidth: window.innerWidth - 10,
  canvasHeight: window.innerHeight - 28,
  imgsLoad: false,
  imgsRatio: 1,
  isStorageSupportedFlag: isStorageSupported(),
  horizontalCellCount: 4,
  verticalCellCount: 4,
  cellLength: 100,
  gapLength: 10,
  cellColor: 'rgba(238, 228, 218, 0.35)',
  blockBgColor: ['#eee4da', '#ede0c8', '#f2b179', '#f59563', '#f67c5f', '#f65e3b', '#edcf72', '#edcc61'],
  blockTextColor: ['#766e65', '#766e65', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2', '#f9f6f2']
}