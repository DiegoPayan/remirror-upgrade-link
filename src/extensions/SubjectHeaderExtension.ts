import {
  ApplySchemaAttributes,
  ExtensionTag,
  InputRulesExtension,
  isNodeActive,
  NodeExtension,
  NodeExtensionSpec,
  ShouldSkipProps,
} from "@remirror/core";

export class SubjectHeaderExtension extends NodeExtension {
  get name() {
    return "subject" as const;
  }

  createTags() {
    return [
      ExtensionTag.Block,
      ExtensionTag.TextBlock,
      ExtensionTag.FormattingNode,
    ];
  }

  createNodeSpec(extra: ApplySchemaAttributes): NodeExtensionSpec {
    return {
      attrs: {
        ...extra.defaults(),
      },
      content: "inline*",
      defining: true,
      draggable: false,
      marks: "",
      parseDOM: [
        {
          tag: "subject",
        },
      ],
      toDOM: () => [
        `subject`,
        {
          class: "",
        },
        0,
      ],
    };
  }

  onCreate(): void {
    this.store
      .getExtension(InputRulesExtension)
      .addHandler("shouldSkipInputRule", this.shouldSkipInputRule.bind(this));
  }

  // Allow users to use markdown characters in the subject
  // by skipping all mark-type input rules inside this node
  private shouldSkipInputRule(props: ShouldSkipProps) {
    const { ruleType, state } = props;

    if (ruleType === "node") {
      return false;
    }

    return isNodeActive({
      state,
      type: this.type,
    });
  }
}

export default SubjectHeaderExtension;
