from wagtail.blocks import (StructBlock, CharBlock, RichTextBlock, StreamBlock,
                            RawHTMLBlock, PageChooserBlock, ListBlock, )


class AlertBlock(StructBlock):
    title = CharBlock(classname="title")
    description = RichTextBlock(label="Column", required=False)

    class Meta:
        template = "blocks/alert.html"


# StreamBlocks
class BaseStreamBlock(StreamBlock):
    """
    Define the custom blocks that `StreamField` will utilize
    """
    alert_block = AlertBlock()
    raw_html_block = RawHTMLBlock()
    richtext_block = RichTextBlock(template="blocks/richtext.html")
