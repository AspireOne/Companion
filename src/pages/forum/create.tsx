import Page from "@/components/Page";
import { Trans, t } from "@lingui/macro";
import { Button, Card, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default () => {
  const { handleSubmit, register } = useForm();

  return (
    <Page title="Create new forum post" showHeader autoBack>
      <Card className="max-w-[600px] mx-auto">
        <form className="p-4 flex flex-col gap-3">
          <h2 className="text-xl">
            <Trans>Basic post info</Trans>
          </h2>
          <Input {...register("title")} label={t`Title`} />
          <Input {...register("category")} label={t`Category`} />

          <Button type="submit">{t`Create new post`}</Button>
        </form>
      </Card>
    </Page>
  );
};
