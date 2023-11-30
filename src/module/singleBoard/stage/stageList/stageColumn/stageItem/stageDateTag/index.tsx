import Tag from 'src/component/Tag';
import { DATE_DUE_COLORS } from 'src/constant';
import CustomDate from 'src/utills/date';

function StageDateTag({ date }: { date: string }) {
    const formattedDate = CustomDate.formatIsoDateTo(date);

    const bgColor =
        formattedDate &&
        (CustomDate.isDatePast(date)
            ? DATE_DUE_COLORS.MISSED
            : DATE_DUE_COLORS.NOT_PASSED);

    return <Tag bgColor={bgColor} icon="date" text={formattedDate} />;
}

export default StageDateTag;
