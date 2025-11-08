import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

interface Review {
    id: string;
    rating: number;
    customerName: string;
    date: string;
    title: string;
    comment: string;
    isVerified: boolean;
}

interface RatingBreakdown {
    stars: number;
    count: number;
}

interface ProductReviewProps {
    overallRating: number;
    totalVerifiedBuyers: number;
    ratingBreakdown: RatingBreakdown[];
    reviews: Review[];
    onWriteReview?: () => void;
}

const ProductReview: React.FC<ProductReviewProps> = ({
    overallRating,
    totalVerifiedBuyers,
    ratingBreakdown,
    reviews,
    onWriteReview
}) => {
    const maxCount = Math.max(...ratingBreakdown.map(r => r.count));

    const renderStars = (rating: number, size = 'w-4 h-4') => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} ${star <= rating
                            ? 'fill-green-500 text-green-500'
                            : 'fill-gray-200 text-gray-200'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const getProgressBarWidth = (count: number) => {
        if (maxCount === 0) return '0%';
        return `${(count / maxCount) * 100}%`;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            {/* Mobile: Button at top */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={onWriteReview}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-md text-sm transition-colors duration-200"
                >
                    WRITE A PRODUCT REVIEW
                </button>
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 flex-1">
                    {/* Power Customer Rating */}
                    <div className="flex-1 xl:max-w-sm">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                            Power Customer Rating
                        </h3>
                        <div className="border-l-3 flex my-10 gap-4 justify-start items-center border-purple-500 pl-2 sm:pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                                    {overallRating.toFixed(2)}
                                </span>
                                <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-green-500 text-green-500" />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>{totalVerifiedBuyers} Verified Buyers</span>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="border-l-3 border-purple-500 pl-2 sm:pl-4">
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((stars) => {
                                    const breakdown = ratingBreakdown.find(r => r.stars === stars);
                                    const count = breakdown?.count || 0;

                                    return (
                                        <div key={stars} className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 w-6 sm:w-8">
                                                <span className="text-sm text-gray-700">{stars}</span>
                                                <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
                                            </div>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative min-w-0">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: getProgressBarWidth(count) }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-700 w-4 text-right flex-shrink-0">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* What Power Customer Say */}
                    <div className="flex-1">
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                                What Power Customer Say
                            </h3>
                            {/* Desktop: Write Review Button */}
                            <div className="hidden lg:block lg:ml-6">

                                <button
                                    onClick={onWriteReview}
                                    className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-4 rounded-sm text-sm transition-colors duration-200 whitespace-nowrap"
                                >
                                    WRITE A PRODUCT REVIEW
                                </button>
                            </div>
                        </div>

                        <div className="pl-2 sm:pl-4">
                            <p className="text-sm text-gray-700 mb-4">Images uploaded by customers:</p>

                            <div className="space-y-4 w-full overflow-y-auto max-h-96">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border w-full border-gray-200 rounded-lg p-3 sm:p-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {renderStars(review.rating, 'w-3 h-3 sm:w-4 sm:h-4')}
                                                <span className="text-sm font-medium text-gray-900">
                                                    {review.customerName}
                                                </span>
                                                {review.isVerified && (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                )}
                                            </div>
                                            <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                                                {review.date}
                                            </span>
                                        </div>

                                        <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">
                                            {review.title}
                                        </h4>
                                        <p className="text-sm text-gray-700 break-words">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

// Example usage with sample data
const sampleData = {
    overallRating: 4.75,
    totalVerifiedBuyers: 4,
    ratingBreakdown: [
        { stars: 5, count: 3 },
        { stars: 4, count: 1 },
        { stars: 3, count: 0 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 }
    ],
    reviews: [
        {
            id: '1',
            rating: 5,
            customerName: 'Sharanu',
            date: '14 Jul, 2025',
            title: 'Product Review',
            comment: 'Good Product',
            isVerified: true
        },
        {
            id: '2',
            rating: 5,
            customerName: 'Pritam',
            date: '13 Jul, 2025',
            title: 'so good',
            comment: 'so good quality',
            isVerified: true
        },
        {
            id: '3',
            rating: 5,
            customerName: 'Ravi',
            date: '26 Jun, 2025',
            title: 'good product',
            comment: 'goo',
            isVerified: true
        },
        {
            id: '4',
            rating: 5,
            customerName: 'Ravi',
            date: '26 Jun, 2025',
            title: 'good product',
            comment: 'goo',
            isVerified: true
        }
    ]
};

export default function App() {
    const handleWriteReview = () => {
        console.log('Write review clicked');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <ProductReview
                    overallRating={sampleData.overallRating}
                    totalVerifiedBuyers={sampleData.totalVerifiedBuyers}
                    ratingBreakdown={sampleData.ratingBreakdown}
                    reviews={sampleData.reviews}
                    onWriteReview={handleWriteReview}
                />
            </div>
        </div>
    );
}