const {
    getAllLibros,
    createLibro,
    updateLibro,
    deleteLibro,
    getLibroById,
    } = require("../../src/controllers/libroController");
    const libroModel = require("../../src/models/libroModel");
    jest.mock("../../src/models/libroModel");
    
    //Agrupamos los tests unitarios con describe
    describe("Libro Controller", () => {
    //Declaramos el objeto response que utilizaremos en cada prueba o funcion
    let mockRes;
    //Bloque que hara que antes de cada ejecucion de test se limpie el status y json de la prueba anterior, el uso de jest.fn sirve para el rastreo de el json y el status y este permitira usarlo con el expect para esperar ciertos resultados mas adelante
    beforeEach(() => {
    mockRes = {
        //jest.fn() hace un  seguimiento de el uso de una funcion y de las variables y sus valores. Y "mockrReturnThis" nos permite encadenar metodos,en nuestro caso status se usara despues de json y son 2 funciones que se encadenan
        //el mockReturnThis se utiliza para poder encadenar funciones en este caso status y json
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    };
    });

    test("getLibros debería obtener todos los libros", async () => {
        //Crea un array con objetos ficticios
    const mockLibros = [
    { id: "1", title: "Libro 1" },
    { id: "2", title: "Libro 2" },
    ];
    //Configura la funcion "libroModel.find" para que cuando sea llamada se resuelva con la variable ficticia 
    libroModel.find.mockResolvedValue(mockLibros);
    //Creamos un objeto vacio ya que el req de la funcion no nos pide como requisito ningun parametro
    const mockReq = {};

    await getAllLibros(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockLibros);
    });

    test("getLibroById debería obtener un libro", async () => {
        //Creamos un objeto como los atributos id, titulo y autor
    const mockLibro = { id: "1", titulo: "Libro Encontrado", autor: "Juan Perez" };
        //Configuramos que cuando la funcion "libroModel.findById" sea llamada se ejecute con el valor de la variable ficticia
    libroModel.findById.mockResolvedValue(mockLibro);
    //Creamos el request de la funcion(params.id = "1")
    const mockReq = { params: { id: "1" } };
    
    await getLibroById(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });


    test("createLibro debería crear un nuevo libro", async () => {
    const mockLibro = { id: "1", titulo: "Nuevo Libro", autor: "Juan Perez" };
    //Declaramos la funcion save vacia para que no interactue con la base de datos    
    mockLibro.save = () => {};
    //Esta linea hace que cuando llamemos a "libroModel.create" se resuelva con la variable simulada y no interactue con la base de datos   
    libroModel.create.mockResolvedValue(mockLibro);

    const mockReq = { body: mockLibro };

    await createLibro(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });


    test("updateLibro debería actualizar un libro existente", async () =>
    {
        //Se crea un id ficticio 
    const libroId = '1';
        //Info del nuevo libro a introducir
    const libroActualizado = { titulo: 'Libro Actualizado', autor: 'Autor Actualizado' };
        //info del libro ya actualizado para utilizarlo en el expect al final
    const libroActualizadoMock = { _id: libroId, ...libroActualizado };
        //configura a la funcion  "libroModel.findByIdAndUpdate" para que se resuelva con la variable ficticia cuando sea llamada
    libroModel.findByIdAndUpdate.mockResolvedValue(libroActualizadoMock);
        //crea el request que se utilizara en la funcion con el id y la informacion del nuevo libro
    const mockReq = { params: { id: libroId }, body: libroActualizado };

    await updateLibro(mockReq, mockRes);
    expect(libroModel.findByIdAndUpdate).toHaveBeenCalledWith(libroId, libroActualizado, { new: true });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(libroActualizadoMock);
    });


    test("updateLibro debería devolver un error si el libro no existe",
    async () => {

        //Configura que cuando se llame a la funcion "libroModel.findByIdAndUpdate" se resuelva con el valor "null" para que arroje un error cuando se llame a la funcion
    libroModel.findByIdAndUpdate.mockResolvedValue(null);
        //Crea el objeto request para la funcion updateLibro con los parametros id y body(no importa el valor de los parametros solo estamos simulando un valor ya que siempreque llamemos a la funcion para actualizar un libro me va a devolver null y por lo tanto forzamos el error)
    const mockReq = {
    params: { id: "99" },
    body: { titulo: "Libro Actualizado" },
    };

    await updateLibro(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Libro no encontrado" });
    });


    test("deleteLibro debería eliminar un libro existente", async () => {
        //Creamos un objeto  con atributos titulo y autor 
    const mockLibroEliminado = { titulo: 'Libro Eliminado', autor: 'Autor Eliminado' };
        //Configuramos la funcion " libroModel.findByIdAndRemove" para que cuando se llame a al funcion me arroje la variable ficticia
    libroModel.findByIdAndRemove.mockResolvedValue(mockLibroEliminado);
        //creamos el request para nuestra funcion(un objeto con el atributo id)
    const mockReq = { params: { id: "1" } };

    await deleteLibro(mockReq, mockRes);
    expect(libroModel.findByIdAndRemove).toHaveBeenCalledWith(mockReq.params.id);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockLibroEliminado);
    });
    });
