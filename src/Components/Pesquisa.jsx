import React, { useState, useEffect } from "react";
import axios from 'axios';

function Pesquisa() {

    const [pesquisa, setPesquisa] = useState({ startDate: '', endDate: '', nomeOperador: '' });
    const [transferencias, setTransferencias] = useState({ content: [] });

    useEffect(() => { }, [transferencias.content]);

    function handleChange(event) {
        setPesquisa({ ...pesquisa, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleRequest();
    }

    function handleRequest(page) {
        axios.get(`http://localhost:8080/transferencias/filtro?page=${page != undefined ? page : 0}&inicio=${pesquisa.startDate}&fim=${pesquisa.endDate}${pesquisa.nomeOperador.length > 0 ? "&operador=" + pesquisa.nomeOperador : ""}`)
            .then(resultado => { setTransferencias(resultado.data) });
    }

    function Pagination() {
        let list = []
        for (let totalPages = 0; totalPages < transferencias.totalPages; totalPages++) {
            list.push(<li className="page-item"><a class="page-link" onClick={() => handleRequest(totalPages)}>{totalPages + 1}</a></li>)
        }
        return list;
    }

    return (
        <div className="formulario-all">
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label className="form-label">Data de Início</label>
                        <input onChange={handleChange} value={pesquisa.startDate} name="startDate" type='date' className="form-control" required={pesquisa.endDate.length > 0 ? true : false} />
                    </div>
                    <div>
                        <label className="form-label">Data de Fim</label>
                        <input onChange={handleChange} value={pesquisa.endDate} name="endDate" type='date' className="form-control" required={pesquisa.startDate.length > 0 ? true : false} />
                    </div>
                    <div>
                        <label className="form-label">Nome do Operador Transacionado</label>
                        <input onChange={handleChange} value={pesquisa.nomeOperador} name="nomeOperador" type='text' className="form-control" />
                    </div>
                </div>
                <div className='button-search' >
                    <input type='submit' value="Pesquisar" className='btn btn-primary btn-sm' />
                </div>
            </form>
            <div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Dados</th>
                            <th scope="col">Valentia</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Nome do Operador Transacionado</th>
                        </tr>
                    </thead>
                    <tbody>{
                        transferencias.content.map((serv, id) => (
                            <tr key={id}>
                                <td>{serv.dataTransferencia}</td>
                                <td>R$ {serv.valor}</td>
                                <td>{serv.tipo}</td>
                                <td>{serv.nomeOperadorTransacao}</td>
                            </tr>
                        ))
                    }


                    </tbody>
                </table>
                <div class="footer">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {
                                Pagination()
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Pesquisa; 