interface Command {
  name: string;
  description: string;
  syntax: string;
  longDescription: string[];

  execute(args: string[]): Promise<void>;
}

export default Command;
