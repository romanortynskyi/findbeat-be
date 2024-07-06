abstract class Command<InputType, OutputType> {
  abstract execute(input: InputType): Promise<void> | void
  result: OutputType
}

export default Command
