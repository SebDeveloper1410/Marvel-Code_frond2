import React from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

const baseUrl = 'https://us-central1-marvelcodebd.cloudfunctions.net/app/api/productos'
class Productos extends React.Component {
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
                descripcion: '',
                valor_unitario: '',
                estado: '',
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

        const precioU = this.state.form.valor_unitario


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
            this.setState({ form: null });
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

    seleccionarProducto = (productos) => {
        this.setState({

            form: {
                id: productos.id,
                descripcion: productos.descripcion,
                valor_unitario: productos.valor_unitario,
                estado: productos.estado

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
             
                <div className="card">
                    <div className="card-header text-center" >
                        <strong>Productos</strong>
                    </div>
                    <div className="row g-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-2">
                                    <input name="id" maxLength="6" placeholder="Identificador" type="text" className="form-control" onChange={this.handleChange} value={form ? form.id : ''} required />
                                </div>
                                <div className="col-md-3">
                                    <textarea name="descripcion" id="descripcion" placeholder="Descripcion" type="text" className="form-control" onChange={this.handleChange} value={form ? form.descripcion : ''} required />

                                </div>
                                <div className="col-md-2">
                                    <input name="valor_unitario" id="valor_unitario" placeholder="Valor unitario" className="form-control" onChange={this.handleChange} value={form ? form.valor_unitario : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <select name="estado" className="form-select" id="estado" onChange={this.handleChange} value={form ? form.estado : ''} required>
                                        <option selected disabled value="">Estado</option>
                                        <option id="Disponible">Disponile</option>
                                        <option id="No disponible">No disponible</option>
                                    </select>

                                </div>
                                <div className="col-md-1">
                                    <button className="btn btn-primary" onClick={() => this.peticionPost()}>Guardar</button>

                                </div>

                                <div className="col-md-1">
                                    <button className="btn btn-success" onClick={() => this.peticionPut()} >Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <br /><br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td><strong>identificador</strong></td>
                            <td><strong>Descripcion</strong></td>
                            <td><strong>valor unitario</strong></td>
                            <td><strong>Estado</strong></td>
                            <td><strong>Accion</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(productos => (
                            <tr key={productos.id}>
                                <td>{productos.id}</td>
                                <td>{productos.descripcion}</td>
                                <td>{productos.valor_unitario}</td>
                                <td>{productos.estado}</td>
                                <div className="mb-9">

                                    <td> <button className="btn btn-primary" onClick={() => { this.seleccionarProducto(productos); this.setState() }}><FontAwesomeIcon icon={faEdit} /></button></td>

                                    <td>  {"   "} <button className="btn btn-danger" onClick={() => { this.seleccionarProducto(productos); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
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

                {/*   <Modal isOpen={this.state.modalUpdate}>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input name="id" maxLength="6"  type="text" className="form-control" onChange={this.handleChange} value={form ? form.id : ''} required />
                            <br />
                            <label htmlFor="nombre">Desripcion</label>
                            <textarea name="descripcion" id="descripcion"  type="text" className="form-control" onChange={this.handleChange} value={form ? form.descripcion : ''} required />

                            <br />
                            <label htmlFor="nombre">Valor unitario</label>
                            <input name="valor_unitario" maxLength="3" id="valor_unitario" placeholder="Valor unitario" className="form-control" onChange={this.handleChange} value={form ? form.valor_unitario : ''} required />
                            <br />
                            <label htmlFor="capital_bursatil">Estado</label>
                          
                                    <select name="estado" className="form-select" id="estado" onChange={this.handleChange} value={form ? form.estado : ''} required>
                                        <option selected disabled value="">Estado</option>
                                        <option id="Disponible">Disponile</option>
                                        <option id="No disponible">No disponible</option>
                                    </select>
                           
                        </div>

                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Actualizar</button>

                    <button className="btn btn-danger" onClick={() => this.setState({ modalUpdate: false })}>Cancelar</button>
                    </ModalFooter>
                </Modal> */}
            </div>


        );
    }
}

export default Productos;