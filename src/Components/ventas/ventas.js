import React from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

const baseUrl = 'https://us-central1-marvelcodebd.cloudfunctions.net/app/api/ventas'
class Ventas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            modalEliminar: false,
            modalUpdate: false,

            form: {
                id: '',
                valor_total: '',
                identificador: '',
                cantidad: '',
                precio_unitario: '',
                fecha_venta: '',
                id_cliente: '',
                nombre_cliente: '',
                vendedor: ''
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

        const valor = this.state.form.valor_total
        const cantidad = this.state.form.cantidad
        const precioU = this.state.form.precio_unitario

        if (!Number(valor)) {
            alert("El campo Valor total debe ser solo numero !!!")
        } else if (!Number(cantidad)) {
            alert("El campo Cantidad debe ser solo numero !!!")
        } else if (!Number(precioU)) {
            alert("El campo Precio Unitario debe ser solo numero !!!")
        }
        else {
            await axios.post(baseUrl, this.state.form).then(response => {
                this.peticionGet();
                this.setState({ form: null });
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

    seleccionarventa = (ventas) => {
        this.setState({
            form: {

                id: ventas.id,
                valor_total: ventas.valor_total,
                identificador: ventas.identificador,
                cantidad: ventas.cantidad,
                precio_unitario: ventas.precio_unitario,
                fecha_venta: ventas.fecha_venta,
                id_cliente: ventas.id_cliente,
                nombre_cliente: ventas.nombre_cliente,
                vendedor: ventas.vendedor

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
                <div className="col-md-3">
                    <table>
                        <tr>
                            <input name="id" maxLength="6" placeholder="Buscar por ID de ventas" type="text" className="form-control" onChange={this.handleChange} required />
                            <td>   <button type="submit" className="btn btn-primary" onClick={() => { this.peticionFilter(); this.setState({ modalFiltro: true }) }}  ><FontAwesomeIcon icon={faSearch} /></button></td>
                        </tr>
                    </table>
                    <br />
                </div>
                <div className="card">
                    <div className="card-header text-center" >
                        <strong>Productos</strong>
                    </div>
                    <div className="row g-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <input name="id" id="id" maxLength="6" placeholder="Identificador de ventas" className="form-control" onChange={this.handleChange} value={form ? form.id : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="valor_total" id="valor_total" placeholder="Valor total" className="form-control" onChange={this.handleChange} value={form ? form.valor_total : ''} required />

                                </div>
                                <div className="col-md-2">
                                    <input name="identificador" maxLength="6" id="identificador" placeholder="Identificador" type="text" className="form-control" onChange={this.handleChange} value={form ? form.identificador : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="cantidad" maxLength="6" id="cantidad" placeholder="Cantidad" type="text" className="form-control" onChange={this.handleChange} value={form ? form.cantidad : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="precio_unitario" id="precio_unitario" placeholder="Precio unitario" type="text" className="form-control" onChange={this.handleChange} value={form ? form.precio_unitario : ''} required />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-2">
                                    <input name="fecha_venta" id="fecha_venta" placeholder="Fecha de venta" type="date" className="form-control" onChange={this.handleChange} value={form ? form.fecha_venta : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="id_cliente" id="id_cliente" placeholder="ID Cliente" type="text" className="form-control" onChange={this.handleChange} value={form ? form.id_cliente : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="nombre_cliente" id="nombre_cliente" placeholder="Nombre cliente" className="form-control" onChange={this.handleChange} value={form ? form.nombre_cliente : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="vendedor" id="vendedor" placeholder="Vendedor" className="form-control" onChange={this.handleChange} value={form ? form.vendedor : ''} required />
                                </div>
                                <div className="col-md-1">
                                    <button className="btn btn-primary" onClick={() => this.peticionPost()} required>Guardar</button>

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

                            <td><strong>Identificador Unico</strong></td>
                            <td><strong>Valor Total</strong></td>
                            <td><strong>Identificador</strong></td>
                            <td><strong>Cantidad</strong></td>
                            <td><strong>Precio Unitario</strong></td>
                            <td><strong>Fecha de Venta</strong></td>
                            <td><strong>ID cLiente</strong></td>
                            <td><strong>Nombre del Cliente</strong></td>
                            <td><strong>Vendedor</strong></td>
                            <td><strong>Accion</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(ventas => (
                            <tr key={ventas.id}>
                                <td>{ventas.id}</td>
                                <td>{ventas.valor_total}</td>
                                <td>{ventas.identificador}</td>
                                <td>{ventas.cantidad}</td>
                                <td>{ventas.precio_unitario}</td>
                                <td>{ventas.fecha_venta}</td>
                                <td>{ventas.id_cliente}</td>
                                <td>{ventas.nombre_cliente}</td>
                                <td>{ventas.vendedor}</td>

                                <div className="mb-9">

                                    <td> <button className="btn btn-primary" onClick={() => { this.seleccionarventa(ventas) }}><FontAwesomeIcon icon={faEdit} /></button></td>
                                    <td>  {"   "} <button className="btn btn-danger" onClick={() => { this.seleccionarventa(ventas); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
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


            </div>
        );
    }
}

export default Ventas;