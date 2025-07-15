from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory storage (replace with a database in production)
entries = {}

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    unit = data.get('unit', 'inches')
    length = float(data.get('length', 0))
    width = float(data.get('width', 0))
    
    # Calculate SFT based on unit
    if unit == 'inches':
        sft = (length * width) / 144
    else:  # centimeters
        sft = (length * width) / 929
    
    # Determine category based on dimensions
    category = categorize_slab(length, width, unit)
    
    return jsonify({
        'sft': round(sft, 2),
        'category': category
    })

@app.route('/api/entries', methods=['POST'])
def save_entries():
    data = request.json
    session_id = data.get('sessionId')
    
    if not session_id:
        session_id = datetime.now().strftime("%Y%m%d%H%M%S")
    
    entries[session_id] = data
    
    return jsonify({
        'success': True,
        'sessionId': session_id
    })

@app.route('/api/entries/<session_id>', methods=['GET'])
def get_entries(session_id):
    if session_id in entries:
        return jsonify(entries[session_id])
    return jsonify({'error': 'Session not found'}), 404

@app.route('/api/export/<session_id>', methods=['GET'])
def export_csv(session_id):
    if session_id not in entries:
        return jsonify({'error': 'Session not found'}), 404
    
    data = entries[session_id]
    
    # Create a temporary CSV file
    filename = f"granite_sft_{session_id}.csv"
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['S.No', 'Length', 'Width', 'SFT', 'Category']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for entry in data.get('entries', []):
            writer.writerow({
                'S.No': entry.get('id'),
                'Length': entry.get('length'),
                'Width': entry.get('width'),
                'SFT': entry.get('sft'),
                'Category': entry.get('category')
            })
    
    # In a real app, you'd return the file for download
    # For this example, we'll just confirm it was created
    return jsonify({
        'success': True,
        'filename': filename
    })

def categorize_slab(length, width, unit):
    """Categorize the slab based on dimensions and unit"""
    if unit == 'inches':
        # Check PATTILU first (override condition)
        if width < 22:
            return "PATTILU"
        
        # Check other categories
        if length >= 45 and 22 <= width <= 34:
            return "UNDER SIZE"
        elif length <= 44 and 22 <= width <= 34:
            return "BELOW SIZE"
        elif length >= 45 and width > 34:
            return "90UPS (UNDER SIZE)"
        elif length <= 44 and width > 34:
            return "90UPS (BELOW SIZE)"
    else:  # centimeters
        # Check PATTILU first (override condition)
        if width < 55:
            return "PATTILU"
        
        # Check other categories
        if length >= 114 and 55 <= width <= 86:
            return "UNDER SIZE"
        elif length <= 111 and 55 <= width <= 86:
            return "BELOW SIZE"
        elif length >= 114 and width > 86:
            return "90UPS (UNDER SIZE)"
        elif length <= 111 and width > 86:
            return "90UPS (BELOW SIZE)"
    
    # Default category if none match
    return "UNCATEGORIZED"

if __name__ == '__main__':
    app.run(debug=True, port=5000)