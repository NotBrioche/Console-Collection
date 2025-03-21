interface Command {
  name: string;
  description: string;
  syntax: string;
  longDescription: string[];

  execute(args: string[] | null): Promise<void>;
}

export default Command;
