import React, { useState } from 'react';

import { CodeEditor } from './components/CodeEditor';

const query = 'CREATE TABLE dbo.EmployeePhoto\n(\n    EmployeeId INT NOT NULL PRIMARY KEY,\n    Photo VARBINARY(MAX) FILESTREAM NULL,\n    MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL\n                    UNIQUE DEFAULT NEWID()\n);\n\nGO\n/*\ntext_of_comment\n/* nested comment */\n*/';

function App() {
  const [value, setValue] = useState(query);
  const [isVisible, setIsVisible] = useState(false);

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleShowValue = () => {
    setIsVisible(!isVisible);
  }

  const handlePrintValue = () => {
    let formattedValue = JSON.stringify(value, (key, value) => {
      if (typeof value === 'string') {
        return value.replace(/\n/g, '\\n');
      }
      return value.replace(/^"(.*)"$/, '$1');
    }).replace(/^"(.*)"$/, '$1');

    console.log(formattedValue);
  }

  return (
    <div className="h-screen flex">
      <main className='flex-1 px-10 py-16 max-w-3xl mx-auto'>

        <div className='flex flex-col gap-4'>
          <h1 className='text-xl font-semibold'>Teste Editor SQL</h1>

          <div className='w-full'>
            <CodeEditor
              language="sql"
              value={value}
              onChange={handleValueChange}
            // disabled
            // autoFocus={false}
            />
          </div>

          <div className='flex gap-4'>
            <button className='px-3 py-2 bg-blue-600 text-white rounded' onClick={handleShowValue}>
              {isVisible ? 'Ocultar' : 'Mostrar'}
            </button>
            <button className='px-3 py-2 bg-blue-600 text-white rounded' onClick={handlePrintValue}>
              Imprimir
            </button>
          </div>

          <div>
            {isVisible && (
              <span>{value}</span>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
