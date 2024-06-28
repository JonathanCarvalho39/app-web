
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';


@Component({
    selector: 'app-update-tecnico',
    templateUrl: './update-tecnico.component.html',
    styleUrls: ['./update-tecnico.component.css']
})
export class UpdateTecnicoComponent implements OnInit {
    tecnico: Tecnico = {
        id: '',
        nome: '',
        cpf: '',
        email: '',
        senha: '',
        perfis: [],
        dataCadatro: '',
        especialidade: '',
        anosExp: null
    };

    form = new FormGroup({
        admin: new FormControl(false),
        nome: new FormControl(null, Validators.minLength(3)),
        cpf: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.email),
        senha: new FormControl(null, Validators.minLength(3)),
        especialidade: new FormControl(null, Validators.minLength(3)),
        anosExp: new FormControl(null, Validators.minLength(1))
    });

    constructor(private service: TecnicoService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.tecnico.id = this.route.snapshot.paramMap.get('id')
        this.findById()
    }

    findById() {
        this.service.findById(this.tecnico.id).subscribe(resp => {
            resp.perfis = []
            this.tecnico = resp;
        });
    }

    update(): void {
        let tipoPessoa = 'tecnicos'
        this.service.update(this.tecnico).subscribe(() => {
            this.toast.success("Técnico atualizado com sucesso")
            this.router.navigate(['/tecnico'])
        }, ex => {
            if (ex.error.errors) {
                ex.error.errors.forEach(element => {
                    this.toast.error(element.message)
                });
            } else {
                this.toast.error(ex.error.message)
            }
        })
    }

    addPerfil(perfil: any) {
        if (this.tecnico.perfis.includes(perfil)) {
            this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil))
        } else {
            this.tecnico.perfis.push(perfil)
        }
    }

    validarCampos(): boolean {
        return this.form.controls['email'].valid &&
            this.form.controls['senha'].valid &&
            this.form.controls['cpf'].valid &&
            this.form.controls['nome'].valid
    }

}
