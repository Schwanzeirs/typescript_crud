import { Repository, FindOneOptions, FindOptionsWhere } from "typeorm";
import { Todos } from "../entities/Todo";
import { AppDataSource } from "../data-source";
import { createTodoSchema } from "../utils/Todos";
import { Request, Response } from "express"
import ITodos from "../utils/Todos";

export default new class TodosService {
  private todos: ITodos[]
  private readonly TodoRepository: Repository<Todos> = AppDataSource.getRepository(Todos)

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body

      const { error } = createTodoSchema.validate(data)
      if (error) return res.status(400).json({ error: error })

      const obj = this.TodoRepository.create({
        name: data.name,
        visi: data.visi,
        image: data.image
      })

      const todos = await this.TodoRepository.save(obj)
      return res.status(200).json(todos)
    } catch (err) {
      return res.status(500).json({ Error: "error while inserting data" })
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      
      const result = await this.TodoRepository.find()

      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ Error: "error while find data" })
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const result = await this.TodoRepository.findOne({where:{id:id}})

      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ Error: "error while find data" })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const newData = req.body
      
      const existedData = await this.TodoRepository.findOne({where:{id:id}})

      existedData.name = newData.name
      existedData.visi = newData.visi
      existedData.image = newData.image

      const result = await this.TodoRepository.save(existedData)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ Error: "error while update data" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      
      await this.TodoRepository.delete(id)

      return res.status(200).json({ message: "Paslon deleted successfully" });
    } catch (error) {
      return res.status(500).json({ Error: "error while delete data" })
    }
  }
}