import React from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

const baseUrl = 'https://us-central1-marvelcodebd.cloudfunctions.net/app/api/usuarios'
class usuarios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataFilter: [],
            modalFiltro: false,
            modalEliminar: false,
            modalUpdate: false,
            form: {
                id: '',
                nombre: '',
                email: '',
                rol: '',
                estado: ''
            }
        }
    }

    peticionGet = () => {
        axios.get(baseUrl).then(response => {
            console.log(response.data);
            this.setState({ data: response.data });

        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionPost = async () => {

        const precioU = this.state.form.email


  if (!Number(precioU)) {
            alert("El campo valor unitario debe ser solo numero !!!")
        } else {
            await axios.post(baseUrl, this.state.form).then(response => {
                this.peticionGet();
                this.setState({form : null });
                alert("Guardado correctamente !!!")
    
            }).catch(error => {
                console.log(error.message);
            })

        } 
      
    }

    peticionPut = () => {
        axios.put(baseUrl + "/" + this.state.form.id, this.state.form).then(response => {


            this.peticionGet();
            this.setState({ modalUpdate: false });
            alert("Actualizado correctamente !!!")
        })
    }

    peticionDelete = () => {
        axios.delete(baseUrl + "/" + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false, form: null });
            console.log(response.data);
            this.peticionGet();

        }).catch(error => {
            console.log(error.message);
        })

    }

    seleccionarusuario = (usuarios) => {

        /*aqui va la funcion de habilitar y desabilitar boton actualizar */

        this.setState({

            form: {
                id: usuarios.id,
               nombre: usuarios.nombre,
                email: usuarios.email,
                rol: usuarios.rol,
                estado: usuarios.estado

            }
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {
        const { form } = this.state;
        return (

            <div className="container mt-5 text-center">
         
                  
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <td><strong>identificador</strong></td>
                            <td><strong>Nombre</strong></td>
                            <td><strong>Email</strong></td>
                            <td><strong>Rol</strong></td>
                            <td><strong>Estado</strong></td>
                            <td><strong>Accion</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(usuarios => (
                            <tr key={usuarios.id}>
                                <td>{usuarios.id}</td>
                                <td>{usuarios.nombre}</td>
                                <td>{usuarios.email}</td>
                                <td>{usuarios.rol}</td>
                                <td>{usuarios.estado}</td>
                                <div className="mb-9">

                                    <td> <button className="btn btn-primary" onClick={() => { this.seleccionarusuario(usuarios); this.setState({ modalUpdate: true }) }}><FontAwesomeIcon icon={faEdit} /></button></td>

                                    <td>  {"   "} <button className="btn btn-danger" onClick={() => { this.seleccionarusuario(usuarios); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                                    {/*  <button className="btn btn-primary" onClick={() => this.peticionPut()}>editar</button> */}
                                </div>


                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar este registro
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false, form: null })}>No</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalUpdate}>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input name="id" maxLength="6"  type="text" className="form-control" onChange={this.handleChange} value={form ? form.id : ''} required />
                            <br />
                            <label htmlFor="nombre">Nombre</label>
                            <input name="nombre" id="descripcion"  type="text" className="form-control" onChange={this.handleChange} value={form ? form.nombre : ''} required />

                            <br />
                            <label htmlFor="email">Email</label>
                            <input name="email" maxLength="3" id="email" placeholder="Email" className="form-control" onChange={this.handleChange} value={form ? form.email : ''} required />
                            <br />
                            <label htmlFor="capital_bursatil">Rol</label>
                          
                                    <select name="rol" className="form-select" id="rol" onChange={this.handleChange} value={form ? form.rol : ''} required>
                                    <option selected>estado</option>
                                           
                                            <option value="Administrador">Administrador</option>
                                            <option value="Vendedor">Vendedor</option>
                                    </select>

                                    <br />
                            <label htmlFor="capital_bursatil">Estado</label>
                          
                                    <select name="estado" className="form-select" id="estado" onChange={this.handleChange} value={form ? form.estado : ''} required>
                                    <option selected>estado</option>
                                            <option value="pendiente">Pendiente</option>
                                            <option value="autorizado">autorizado</option>
                                            <option value="no autorizado">no autorizado</option>
                                    </select>
                           
                        </div>

                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Actualizar</button>

                    <button className="btn btn-danger" onClick={() => this.setState({ modalUpdate: false })}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>


        );
    }
}

export default usuarios;