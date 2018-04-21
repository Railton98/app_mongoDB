import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { PerfilProvider } from './../../providers/perfil/perfil';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[UsuarioProvider, PerfilProvider, Camera, Geolocation]
})
export class HomePage {

  public usuarios = [];
  public perfis = [];

  public usuarioCadastro = {"_id": "", "nome": "", "idade": null, "foto": "", "lat": null, "long": null};

  constructor(public navCtrl: NavController,
    private usuarioService: UsuarioProvider,
    private perfilProvider: PerfilProvider,
    private camera: Camera,
    private geolocation: Geolocation) {
    this.getUsuarios();
    this.getPerfis();
  }

  public tirarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.usuarioCadastro.foto = base64Image;
    }, (err) => {
     // Handle error
    });
  }

  public getUsuarios(){
    this.usuarioService.findAll().subscribe(response => this.usuarios = response);
  }

  public getPerfis(){
    this.perfilProvider.findAll()
    .subscribe(response => this.perfis = response);
  }

  public popularForm(usuario){
    this.usuarioCadastro = usuario;
  }

  public compareFn(e1: any, e2: any): boolean {
  return e1 && e2 ? e1.id === e2.id : e1 === e2;
}

  public salvarUsuario(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.usuarioCadastro.lat = resp.coords.latitude;
      this.usuarioCadastro.long = resp.coords.longitude;

      if(this.usuarioCadastro._id == ""){
        this.usuarioService.salvar(this.usuarioCadastro).subscribe(response => this.getUsuarios());
      } else{
        this.usuarioService.editar(this.usuarioCadastro).subscribe(response => this.getUsuarios());
      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  public deletar(id){
    this.usuarioService.deletar(id).subscribe(response => this.getUsuarios());
  }

}
