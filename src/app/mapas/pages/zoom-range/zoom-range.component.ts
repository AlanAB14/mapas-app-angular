import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .row {
      background-color: white;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLabel: number = 14;
  center: [number, number] = [-61.9688009832536, -33.74549409105073];

  constructor() { }
  
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLabel
    });

    this.mapa.on('zoom', (e) => {
      this.zoomLabel = this.mapa.getZoom();
    })

    this.mapa.on('zoomend', (e) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      };
    })

    this.mapa.on('move', (e) => {
      const target = e.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng, lat];
    })
  }


  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string ) {
    this.mapa.zoomTo( Number(valor) )
  }

}
