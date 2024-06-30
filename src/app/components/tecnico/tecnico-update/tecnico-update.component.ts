
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';


@Component({
    selector: 'app-update-tecnico',
    templateUrl: './tecnico-update.component.html',
    styleUrls: ['./tecnico-update.component.css']
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
        especialidade: new FormControl(null, Validators.minLength(2)),
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

            this.tecnico = resp;
            this.tecnico.perfis.splice(this.tecnico.perfis.indexOf('TECNICO'), 1)
            this.tecnico.perfis.push(2)
            this.tecnico.perfis.splice(this.tecnico.perfis.indexOf('CLIENTE'), 1)
            this.tecnico.perfis.push(1)

            this.tecnico.perfis.forEach(element => {

                if (element == 'ADMIN') {
                    this.form.patchValue({ admin: true });
                    this.tecnico.perfis.splice(0, 1)
                    this.tecnico.perfis.push(0)
                }

            })

        });
    }

    update(): void {
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
            this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
        } else {
            this.tecnico.perfis.push(perfil)
        }
    }

    validarCampos(): boolean {
        return this.form.valid
      }

}
