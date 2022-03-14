const Contador = () => {
    //creamos un estado desestructurado
    const [contador, setContador] = React.useState(0);
    console.log(contador);
    //interpolamos variable
    //modularizamos el incremento y decremento
    const aumentar = () => {
        setContador(contador + 1)
    }
    const disminuir = () => {
        setContador(contador - 1)
    }
    return ( 
    <div className="form-group bg-dark">
        <h1 className={ contador < 0 ? 'menor' : 'mayor'} >Contador:{contador}</h1>
        <hr className="my-1 jumbotron"/>
         <div className=" form-control py-2 mr-2">
         <button className="btn btn-success btn-block form-control m-2"
         onClick = { aumentar }
         > + </button>
         
        <button className="btn btn-danger btn-block form-control m-2"
        onClick={ disminuir }> - </button>
        </div>
    </div>)
}