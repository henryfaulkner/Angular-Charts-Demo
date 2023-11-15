// shimmer-loader.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ShimmerService } from 'src/app/core/services/shimmer.service';
@Component({
 selector: 'app-shimmer-loader',
 templateUrl: './shimmer-loader.component.html',
 styleUrls: ['./shimmer-loader.component.scss']
})

export class ShimmerLoaderComponent implements OnInit {
 @Input() shimmerFor: string;

constructor(private shimmerService: ShimmerService) {}

ngOnInit(): void {
 const animationId = this.shimmerService.generateShimmerAnimationId();
 this.startShimmerAnimation(animationId);
 }

ngOnDestroy(): void {
 this.shimmerService.removeShimmerAnimation(this.shimmerFor);
 }

startShimmerAnimation(animationId: string): void {
 // Implement shimmer animation logic here
 }
}