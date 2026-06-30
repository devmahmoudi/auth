import { Input } from "@devmahmoudi/ui";
import { Label } from "@devmahmoudi/ui";
import { Button } from "@devmahmoudi/ui";

type RegisterFormProps = {
  title?: string;
  subtitle?: string;
};

export default function RegisterForm({ title, subtitle }: RegisterFormProps) {
  return (
    <div dir="rtl" className="space-y-5 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">{title ?? "ثبت نام"}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <Label>نام</Label>
          <Input name="firstName" className="mt-2" />
        </div>

        <div>
          <Label>شماره همراه</Label>
          <Input
            name="phoneNumber"
            placeholder="09123456789"
            className="mt-2"
          />
        </div>

        <Button type="submit" className="w-full">
          ارسال کد
        </Button>
      </form>
    </div>
  );
}
