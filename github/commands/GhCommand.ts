import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { GithubApp } from "../GithubApp";
import { CommandUtility } from "../lib/commandUtility";

export class GHCommand implements ISlashCommand {
    public constructor(private readonly app: GithubApp) {}
    public command: string = "gh";
    public i18nParamsExample: string = "";
    public i18nDescription: string = "fetching github data";
    public providesPreview: boolean = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ): Promise<void> {
        const command = context.getArguments();
        const sender = context.getSender();
        const room = context.getRoom();

        if (!Array.isArray(command)) {
            return;
        }

        const commandUtility = new CommandUtility(
            {
                sender: sender,
                room: room,
                command: command,
                context: context,
                read: read,
                modify: modify,
                http: http,
                persistence: persistence,
                app: this.app
            }
        );

        commandUtility.resolveCommand();
    }
}
