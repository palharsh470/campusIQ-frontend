
export default function Badge({heading, subheading}) {
    return (
        <div className="flex items-center mr-2 space-x-2.5 border border-green-500/30 rounded-full bg-green-100 p-1 text-sm text-green-600">
            <p className="pl-3">{heading}</p>
            <div className="flex items-center space-x-1 bg-green-500 text-white border border-green-500 rounded-2xl px-3 py-1">
                <p>{subheading}</p>
              
            </div>
        </div>
    );
};