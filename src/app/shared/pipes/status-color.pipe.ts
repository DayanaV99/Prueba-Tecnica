import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return 'gray';

    switch (value.toLowerCase()) {
      case 'alive': return 'green';
      case 'dead': return 'red';
      default: return 'gray';
    }
  }
}
