import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'uploads'
})
export class ImageUrlPipe implements PipeTransform {
  transform(img: string | null): string {
    if (!img) {
      return ''; 
    }
    console.log( environment.DOMAIN_URL + '/uploads/' + img)
    return environment.DOMAIN_URL + '/uploads/' + img;
  }
}
