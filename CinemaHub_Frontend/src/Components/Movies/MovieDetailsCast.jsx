import React from 'react';
import { Typography, Card } from "@material-tailwind/react"; 
import { FaUser } from "react-icons/fa"; 
import { useTheme } from "../../context/ThemeContext";

const MovieDetailsCast = ({ castData }) => {
    const { isDarkMode, colors } = useTheme();

    if (!castData || !Array.isArray(castData) || castData.length === 0) {
        return null;
    }

    return (
        <Card className={`shadow-xl rounded-lg ms-20 w-[90%] p-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"}`}>
            <Typography variant="h3" className="text-2xl font-bold mb-6 flex items-center gap-2" color={isDarkMode ? "white" : "blue-gray"}>
                <FaUser className="w-6 h-6" style={{ color: colors.primary }} />
                Cast
            </Typography>
            <div className="flex gap-12 overflow-x-auto pb-4">
                {castData.map(member => (
                    <div key={member.id} style={{ width: '120px', flexShrink: 0 }} className="text-center">
                        <img 
                            src={member.img} 
                            alt={member.name || 'Cast member'}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                        />
                        <Typography variant="h6" className="text-sm" color={isDarkMode ? "white" : "blue-gray"}>
                            {member.name} 
                        </Typography>
                        <Typography variant="small" className="text-xs" color={isDarkMode ? "gray" : "blue-gray"}>
                            {member.role}
                        </Typography>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default MovieDetailsCast;